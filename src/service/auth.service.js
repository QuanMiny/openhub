const connection = require("../app/database");

class AuthService {
  async checkMoment(momentId, userId) {
    // 根据 动态id 和 用户id 查询是否存在动态
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`;
    const [result] = await connection.execute(statement, [momentId, userId]);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
