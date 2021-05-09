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
    // 删除用户
    async delUser(userId) {
        return await this.app.mysql.delete('user', {userId})
    }

    // 寻找用户当前信息
    async findUser(userId) {
        let sql = 'select * from user where userId = ? ';
        return await this.app.mysql.query(sql, userId)
    }

    // 更新用户信息
    async updateUser(userId, password, userPhoneNumber) {
        const row = {
            password: password,
            userPhoneNumber: userPhoneNumber
        }
        const options = {
            where: {
                userId: userId
            }
        }
        return await this.app.mysql.update('user', row, options);
    }
    
}

module.exports = AdminUserService;