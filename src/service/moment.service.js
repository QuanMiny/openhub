const connection = require("../app/database");
const momentRouter = require("../router/moment.router");

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
	    JSON_OBJECT('id', u.id, 'name', u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;
      `;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new MomentService();
