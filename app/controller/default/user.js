'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 登录
  async login() {
    let sql = 'select * from user';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = result;

  }
  //   注册
  async register() {
    let { app, ctx } = this;
    let { userName, password } = ctx.request.body;
    const result = await app.mysql.insert('user', { userName, password});
    ctx.body = result;
    
  }
}

module.exports = UserController;
