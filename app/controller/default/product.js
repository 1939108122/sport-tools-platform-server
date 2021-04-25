'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {

  // 根据id获取对应商品
  async getProByCategory() {
    let id = this.ctx.params.id;
    let list = await this.ctx.service.product.getProByCategory(id);
    this.ctx.body = list;
  }
}

module.exports = ProductController;
