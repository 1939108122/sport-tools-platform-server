const Service = require('egg').Service;

class OrderService extends Service {
    // 添加用户订单信息
    async AddOrder(length, data) {
        let sql = 'insert into orders values(null,?,?,?,?,?,?)';
        for (let i = 0; i < length - 1; i++) {
          sql += ",(null,?,?,?,?,?,?)"
        }
    
        return await this.app.mysql.query(sql, data);
    }

    // 获取用户的所有订单信息
    async GetOrder(user_id) {
        let sql = 'select * from orders where user_id =? order by order_time desc';
        return await this.app.mysql.query(sql, user_id);
    }

    // 获取所有的订单id
    async GetOrderGroup(user_id) {
        let sql = 'select order_id from orders where user_id = ? group by order_id desc';
        return await this.app.mysql.query(sql, user_id);
    }
}

module.exports = OrderService;