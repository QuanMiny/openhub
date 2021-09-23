const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) values (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  // 存在返回数据，不存在返回undefined
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
