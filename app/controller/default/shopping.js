'use strict';

const Controller = require('egg').Controller;
const { ShoppingCartData } = require('../../middleware/shoppingCartData.js');

class ShoppingController extends Controller {

  // 获取购物车信息
  async getShoppingCart() {
    let { ctx } = this;
    let { user_id } = ctx.request.body;
    // 获取购物车信息
    const shoppingCart = await ctx.service.shopping.GetShoppingCart(user_id);
    // 生成购物车详细信息
    const data = await ShoppingCartData(ctx, shoppingCart);

    ctx.body = {
      code: '001',
      shoppingCartData: data
    }
  }
  // 添加购物车
  async addShoppingCart() {
    let { ctx } = this;
    let { user_id, product_id } = ctx.request.body;

    let tempShoppingCart = await ctx.service.shopping.FindShoppingCart(user_id, product_id);
    //判断该用户的购物车是否存在该商品
    if (tempShoppingCart.length > 0) {
      //如果存在则把数量+1
      const tempNum = tempShoppingCart[0].num + 1;

      const product = await ctx.service.product.getDetails(tempShoppingCart[0].product_id);
      const maxNum = Math.floor(product[0].product_num / 2);
      //判断数量是否达到限购数量
      if (tempNum > maxNum) {
        ctx.body = {
          code: '003',
          msg: '数量达到限购数量 ' + maxNum
        }
        return;
      }

    // 更新购物车信息,把数量+1
    const result = await ctx.service.shopping.UpdateShoppingCart(tempNum, user_id, product_id);

    if (result.affectedRows === 1) {
        ctx.body = {
        code: '002',
        msg: '该商品已在购物车，数量 +1'
        }
        return;
    }

    } else {
      //不存在则添加
        // 新插入购物车信息
        const res = await ctx.service.shopping.AddShoppingCart(user_id, product_id);
        // 判断是否插入成功
        if (res.affectedRows === 1) {
          // 如果成功,获取该商品的购物车信息
          const shoppingCart = await ctx.service.shopping.FindShoppingCart(user_id, product_id);
          // 生成购物车详细信息
          const data = await ShoppingCartData(ctx, shoppingCart);

          ctx.body = {
            code: '001',
            msg: '添加购物车成功',
            shoppingCartData: data
          }
          return;
        }
    }

    ctx.body = {
      code: '005',
      msg: '添加购物车失败,未知错误'
    }
  }
  // 更新购物车
  async updateShoppingCart() {
    let { ctx } = this;
    let { user_id, product_id, num } = ctx.request.body;
    // 判断数量是否小于1
    if (num < 1) {
      ctx.body = {
        code: '004',
        msg: '数量不合法'
      }
      return;
    }
    // 判断该用户的购物车是否存在该商品
    let tempShoppingCart = await ctx.service.shopping.FindShoppingCart(user_id, product_id);

    if (tempShoppingCart.length > 0) {
      // 如果存在则修改

      // 判断数量是否有变化
      if (tempShoppingCart[0].num == num) {
        ctx.body = {
          code: '003',
          msg: '数量没有发生变化'
        }
        return;
      }
      const product = await ctx.service.product.getDetails(product_id);
      const maxNum = Math.floor(product[0].product_num / 2);
      // 判断数量是否达到限购数量
      if (num > maxNum) {
        ctx.body = {
          code: '004',
          msg: '数量达到限购数量 ' + maxNum
        }
        return;
      }
        // 修改购物车信息
        const result = await ctx.service.shopping.UpdateShoppingCart(num, user_id, product_id);
        // 判断是否修改成功
        if (result.affectedRows === 1) {
          ctx.body = {
            code: '001',
            msg: '修改购物车数量成功'
          }
          return;
        }
    } else {
      //不存在则返回信息
      ctx.body = {
        code: '002',
        msg: '该商品不在购物车'
      }
    }
    
  }
  // 删除购物车
  async deleteShoppingCart() {
    let { ctx } = this;
    let { user_id, product_id } = ctx.request.body;
    // 判断该用户的购物车是否存在该商品
    let tempShoppingCart = await ctx.service.shopping.FindShoppingCart(user_id, product_id);

    if (tempShoppingCart.length > 0) {
        // 如果存在则删除
        const result = await ctx.service.shopping.DeleteShoppingCart(user_id, product_id);
        // 判断是否删除成功
        if (result.affectedRows === 1) {
            ctx.body = {
            code: '001',
            msg: '删除购物车成功'
            }
            return;
        }
    } else {
        // 不存在则返回信息
        ctx.body = {
        code: '002',
        msg: '该商品不在购物车'
        }
    }
  }
}

module.exports = ShoppingController;
