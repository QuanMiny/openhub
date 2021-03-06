const connection = require("../app/database");

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    // 返回数据
    return result;
  }

  async reply(momentId, content, commentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    // 返回数据
    return result;
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    // 返回数据
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    // 返回数据
    return result;
  }

  async getCommentsByMomentId(momentId) {
    const statement = `
    SELECT 
      c.id, c.content, c.comment_id commnetId, c.createAt createTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment c
    LEFT JOIN user u ON u.id = c.user_id
    WHERE moment_id = ?;
  `;
    const [result] = await connection.execute(statement, [momentId]);
    // 返回数据
    return result;
  }
}

module.exports = new CommentService();
