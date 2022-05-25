const connection = require('../app/database');

class UserService {
    async create(user) {
        const { name, password } = user;

        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`
        //  将 user 存储到数据库中
        const result = await connection.execute(statement, [name, password]);
        // 返回数据
        return result[0];
    }

    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`
        const result = await connection.execute(statement, [name]);
        return result[0];
    }

    async getUserInfoById(userId) {
        const statement = `
        SELECT 
            u.id, u.name, u.avatar_url
        FROM user u
        WHERE u.id = ?;`
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    } 
}

module.exports = new UserService();