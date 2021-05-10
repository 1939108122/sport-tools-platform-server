'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {

  // 获取订单列表
  async getList() {
    let { ctx } = this;
    let { search, currentPage, pageSize } = ctx.request.body;
    let offset = (currentPage -1 )*pageSize;
    let  list = await ctx.service.adminOrder.getList(search, offset, pageSize);
    let total = (await ctx.service.adminOrder.getList(search)).length;
    ctx.body = {
        code: 200,
        list,
        total
    }
  }

    // 删除订单
    async deleteOrder() {
        let { ctx } = this;
        let { id } = ctx.request.body;
        let result = await ctx.service.adminOrder.deleteOrder(id);
        if (result.affectedRows == 1 )
        {
            ctx.body = {
                code: 200,
                msg: '删除成功'
            }
        }
        else {
            ctx.body = {
                code: 300,
                msg: '删除失败'
            }
        }
    }
}

module.exports = OrderController;
