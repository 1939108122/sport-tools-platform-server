const Service = require('egg').Service;

class AdminOrderService extends Service {
    // 获取订单列表
    async getList(search, offset = 0, rows = 0) {
        let sql = `select * from orders where order_id like "%${ search }%"`;
        if (rows != 0)
        {
            sql += "order by id limit " + offset + "," + rows;
        }
        return await this.app.mysql.query(sql, []);
    }
    // 删除订单
    async deleteOrder(id) {
        return await this.app.mysql.delete('orders', {id});
    }
}

module.exports = AdminOrderService;