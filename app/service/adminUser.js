const Service = require('egg').Service;

class AdminUserService extends Service {
    // 登录
    async login(username, password) {
        const sql = 'select * from adminuser where username = ? and password = ?';
        return await this.app.mysql.query(sql, [username, password]);
    }
}

module.exports = AdminUserService;