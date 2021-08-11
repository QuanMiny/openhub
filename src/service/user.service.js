const connection = require('../app/database');

class UserService {
    async create(user) {
        const { name, password } = user;

        const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
        //  将 user 存储到数据库中
        const result = await connection.execute(statement, [ name, password ]);
        // 返回数据
        return result;
    }
}

module.exports = new UserService();