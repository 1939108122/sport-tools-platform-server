'use strict';

const Controller = require('egg').Controller;

class CollectController extends Controller {

  // 添加收藏
  async addCollect() {
    let { ctx } = this;
    let { user_id, product_id } = ctx.request.body;
    // 判断该用户的收藏列表是否存在该商品
    let tempCollect = await ctx.service.collect.FindCollect(user_id, product_id);

    if (tempCollect.length > 0) {
      ctx.body = {
        code: '003',
        msg: '该商品已经添加收藏，请到我的收藏查看'
      }
      return;
    }
    // 获取当前时间戳
    const timeTemp = new Date().getTime();
    // 把收藏商品信息插入数据库
    const result = await ctx.service.collect.AddCollect(user_id, product_id, timeTemp);
    // 插入成功
    if (result.affectedRows === 1) {
      ctx.body = {
        code: '001',
        msg: '添加收藏成功'
      }
      return;
    }
    ctx.body = {
        code: '002',
        msg: '添加收藏失败'
    }
  }

  // 获取用户的所有收藏商品信息
  async getCollect() {
    let { ctx } = this;
    let { user_id } = ctx.request.body;
    // 获取所有收藏信息
    const collect = await ctx.service.collect.GetCollect(user_id);

    // 该用户没有收藏的商品,直接返回信息
    if (collect.length == 0) {
      ctx.body = {
        code: '002',
        msg: '该用户没有收藏的商品'
      }
      return;
    }

    let collectList = [];
    // 生成收藏商品的详细信息列表
    for (let i = 0; i < collect.length; i++) {
      const temp = collect[i];
      // 获取每个商品详细信息
      const product = await ctx.service.product.getDetails(temp.product_id);
      collectList.push(product[0]);
    }

    ctx.body = {
      code: '001',
      collectList: collectList
    }
    
  }

  // 删除用户的收藏商品信息
  async deleteCollect() {
    let { ctx } = this;
    let { user_id, product_id } = ctx.request.body;
    // 判断该用户的收藏列表是否存在该商品
    let tempCollect = await ctx.service.collect.FindCollect(user_id, product_id);
    if (tempCollect.length > 0) {
        // 如果存在则删除
        const result = await ctx.service.collect.DeleteCollect(user_id, product_id);
        // 判断是否删除成功
        if (result.affectedRows === 1) {
            ctx.body = {
                code: '001',
                msg: '删除收藏成功'
            }
            return;
        }
      } else {
        // 不存在则返回信息
        ctx.body = {
          code: '002',
          msg: '该商品不在收藏列表'
        }
      }
    
  }
}

module.exports = CollectController;
