const Service = require('egg').Service;

class ProductService extends Service {
    // 根据id获取对应商品
    async getProByCategory(id) {
        const sql = 'select * from product where category_id = ?';
        return await this.app.mysql.query(sql, id);
    }
}

module.exports = ProductService;