const Service = require('egg').Service;

class UserService extends Service {
    // 登录
    async login(userName, password) {
        const sql = 'select * from user where userName = ? and password = ?';
        return await this.app.mysql.query(sql, [userName, password]);
    }
    // 注册
    async register(userName, password, userPhoneNumber) {
        return await this.app.mysql.insert('user', { userName, password, userPhoneNumber });
    }
    // 查找用户
    async find(userName) {
        const user = await this.app.mysql.query('select * from user where userName = ?', userName);
        return user;
    }
    // 查找用户
    async getUserInfoByID(userId) {
        const user = await this.app.mysql.query('select * from user where userId = ?', userId);
        return user;
    }
    // 查找用户
    async getUserList() {
        const sql = 'select * from user';
        return await this.app.mysql.query(sql);

    }
}

module.exports = UserService;