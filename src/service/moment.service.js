const {APP_HOST, APP_PORT} = require("../app/config")

const connection = require("../app/database");

// const sqlFragment = `
//     SELECT 
//         m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//         JSON_OBJECT('id', u.id, 'name', u.name) author
//     FROM moment m
//     LEFT JOIN user u ON m.user_id = u.id
// `;

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
    const result = await connection.execute(statement, [userId, content]);
    // 返回数据
    return result[0];
  }

  async getMomentById(id) {
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
      IF(COUNT(l.id), JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
      ), NULL) labels,
      (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'createTime', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
      ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
      (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', file.filename))
      FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
        SELECT 
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url) author,
          (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
          (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', file.filename))
          FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        ORDER BY m.updateAt DESC
        LIMIT ?, ?;
      `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async hasLabel(momentId, LabelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;
    const [result] = await connection.execute(statement, [momentId, LabelId]);
    return result[0] ? true : false;
  }

  async addLabel(momentId, LabelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, LabelId]);
    return result;
  }
}

module.exports = new MomentService();
