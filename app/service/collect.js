const Service = require('egg').Service;

class CollectService extends Service { 
    // 添加收藏
    async AddCollect(user_id, product_id, timeTemp) {
        const sql = 'insert into collect values(null,?,?,?)';
        return await this.app.mysql.query(sql, [user_id, product_id, timeTemp]);
    }
    // 获取用户的所有收藏商品信息
    async GetCollect(user_id) {
        const sql = 'select * from collect where user_id=?';
        return await this.app.mysql.query(sql, user_id);
    }
    // 删除收藏
    async DeleteCollect(user_id, product_id) {
        const sql = 'delete from collect where user_id=? and product_id=?';
        return await this.app.mysql.query(sql, [user_id, product_id]);
    }
     // 获取用户的某个收藏商品信息
     async FindCollect(user_id, product_id) {
        const sql = 'select * from collect where user_id=? and product_id=?';
        return await this.app.mysql.query(sql, [user_id, product_id]);
    }
}

module.exports = CollectService;