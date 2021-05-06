const Service = require('egg').Service;

class AdminUserService extends Service {
    // 登录
    async login(username, password) {
        const sql = 'select * from adminuser where username = ? and password = ?';
        return await this.app.mysql.query(sql, [username, password]);
    }

     // 列表
     async getList(search, offset = 0, rows = 0) {
        let sql = `select * from user where userName like "%${ search }%"`;
        if (rows != 0)
        {
            sql += "order by userId limit " + offset + "," + rows;
        }
        return await this.app.mysql.query(sql, []);
        
    }
}

module.exports = AdminUserService;