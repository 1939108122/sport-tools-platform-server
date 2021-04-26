const Service = require('egg').Service;

class ProductService extends Service {
    // 根据id获取对应商品
    async getProByCategory(id, offset = 0, rows = 0) {
        let sql = 'select * from product where category_id = ?';
        if (id == 0)
        {
            sql = 'select * from product';
        }
        if (rows != 0) {
            sql += " order by product_sales desc limit " + offset + "," + rows;
        }
        return await this.app.mysql.query(sql, id);
    }

    // 获取分类列表
     async getCategory() {
        const sql = 'select * from category';
        return await this.app.mysql.query(sql);
    }
}

module.exports = ProductService;