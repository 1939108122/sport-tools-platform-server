'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {

  // 根据id获取对应商品
  async getProByCategory() {
    let { category_id, currentPage, pageSize } = this.ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    let list = await this.ctx.service.product.getProByCategory(category_id, offset, pageSize);
    let total = (await this.ctx.service.product.getProByCategory(category_id)).length;
    this.ctx.body = {
        code: '001',
        list,
        total
    }
  }

  // 获取分类列表
  async getCategory() {
    let list = await this.ctx.service.product.getCategory();
    this.ctx.body = list;
  }
  // 搜索商品
  async getProductBySearch() {
    let { search, currentPage, pageSize } = this.ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 获取分类列表
    const category = await this.ctx.service.product.getCategory();
    let Product;
    let total;
    for (let i = 0; i < category.length; i++) {
        // 如果搜索条件为某个分类名称,直接返回该分类的商品信息
        if (search == category[i].category_name) {
          // 获取该分类的商品信息
          Product = await this.ctx.service.product.getProByCategory(category[i].category_id, offset, pageSize);
          // 获取该分类所有的商品数量,用于前端分页计算
          total = (await this.ctx.service.product.getProByCategory(category[i].category_id)).length;
  
          this.ctx.body = {
            code: '001',
            Product,
            total
          }
          return;
        }
      }
      // 否则返回根据查询条件模糊查询的商品分页结果
    Product = await this.ctx.service.product.getProductBySearch(search, offset, pageSize);
    // 获取模糊查询的商品结果总数
    total = (await this.ctx.service.product.getProductBySearch(search)).length;

    this.ctx.body = {
      code: '001',
      Product,
      total
    }
  }
}

module.exports = ProductController;
