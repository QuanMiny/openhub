const connection = require("../app/database");

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    // 返回数据
    return result;
  }

  async reply(momentId, content, commentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, commentId, userId]);
    // 返回数据
    return result;
  }
}

module.exports = new CommentService();
