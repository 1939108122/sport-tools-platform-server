const Service = require('egg').Service;

class ProductService extends Service {
    // 根据id获取对应商品
    async getProByCategory(id, offset = 0, rows = 0) {
        let sql = "select * from product where category_id = ? ";
        if (id == '0')
        {
            sql = "select * from product ";
            if (rows != 0) {
                sql += "limit " + offset + "," + rows;
            }
            return await this.app.mysql.query(sql, []);
            
        }
        if (rows != 0) {
            sql += "order by product_sales desc limit " + offset + "," + rows;
        }
        return await this.app.mysql.query(sql, id);
    }

    // 获取分类列表
     async getCategory() {
        const sql = 'select * from category';
        return await this.app.mysql.query(sql);
    }

    // 搜索商品
    async getProductBySearch(search, offset = 0, rows = 0) {
        let sql = `select * from product where product_name like "%${ search }%" or product_title like "%${ search }%" or product_intro like "%${ search }%"`;

        if (rows != 0) {
            sql += "order by product_sales desc limit " + offset + "," + rows;
        }
        
        return await this.app.mysql.query(sql, []);
    }

    // 获取商品详情
    async getDetails(productID) {
        const sql = 'select * from product where product_id = ?';
        return await this.app.mysql.query(sql, productID);
    }

     // 获取商品详情图片
     async getDetailsPicture(productID) {
        const sql = 'select * from product_picture where product_id = ?';
        return await this.app.mysql.query(sql, productID);
    }
}

module.exports = ProductService;