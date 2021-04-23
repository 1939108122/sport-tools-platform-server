const Service = require('egg').Service;

class UserService extends Service {
    async register(userName, password) {
        return await this.app.mysql.insert('user', { userName, password });
    }
    async find(userName) {
        const user = await this.app.mysql.query('select * from user where userName = ?', userName);
        return user;
    }
}

module.exports = UserService;