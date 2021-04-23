'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 登录
  async login() {
    let sql = 'select * from user';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = result;

  }
  //  注册
  async register() {
    let { ctx } = this;
    let { userName, password } = ctx.request.body;
    const result = await ctx.service.user.register(userName, password);
    ctx.body = result;
  }
//  寻找用户
  async find() {
    let { ctx } = this;
    let { userName } = ctx.request.body;
    const result = await ctx.service.user.find(userName);
    if (result.length == 0)
    {
        ctx.body = {
            code: 0,
            message: '用户名不存在，可以注册'
        }
        return;
    }

    if (result.length == 1)
    {
        ctx.body = {
            code: 1,
            message: '用户名已经存在，不能注册'
        }
        return;
    }

    //数据库设置用户名唯一，
    //若存在result.length != 1 || result.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
        code: 500,
        message: '未知错误'
    }
  }
}

module.exports = UserController;
