const Service = require('egg').Service;

class ShoppingService extends Service {
    // 获取购物车信息
    async GetShoppingCart(user_id) {
        const sql = 'select * from shoppingcart where user_id = ?';
        return await this.app.mysql.query(sql, user_id);
    }

    // 查询用户的购物车的某个商品
    async FindShoppingCart(user_id, product_id) {
        const sql = 'select * from shoppingcart where user_id = ? and product_id = ?';
        return await this.app.mysql.query(sql, [user_id, product_id]);
    }

    // 新插入购物车信息
    async AddShoppingCart(user_id, product_id) {
        const sql = 'insert into shoppingcart values(null,?,?,1,1)';
        return await this.app.mysql.query(sql, [user_id, product_id]);
    }

    // 更新购物车商品数量
    async UpdateShoppingCart(NewNum, user_id, product_id) {
        const sql = 'update shoppingcart set num =? where user_id =? and product_id =?';
        return await this.app.mysql.query(sql, [NewNum, user_id, product_id]);
    }
    // 删除购物车信息
    async DeleteShoppingCart(user_id, product_id) {
        const sql = 'delete from shoppingcart where user_id =? and product_id =?';
        return await this.app.mysql.query(sql, [user_id, product_id]);
    }
    // 更新购物车租用时间
    async updateShoppingCartRentMonth(rent_month, user_id, product_id) {
        const sql = 'update shoppingcart set rent_month =? where user_id =? and product_id =?';
        return await this.app.mysql.query(sql, [rent_month, user_id, product_id]);
    }
}

module.exports = ShoppingService;