'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {

  // 根据id获取对应商品
  async getProByCategory() {
    let { category_id, currentPage, pageSize } = this.ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    let list = await this.ctx.service.product.getProByCategory(category_id, offset, pageSize);
    this.ctx.body = list;
  }

  // 获取分类列表
  async getCategory() {
    let list = await this.ctx.service.product.getCategory();
    this.ctx.body = list;
  }
}

module.exports = ProductController;
