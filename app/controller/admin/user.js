'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 登录
  async login() {
    let { ctx } = this;
    let { username, password } = ctx.request.body;
    let user = await ctx.service.adminUser.login(username, password);
    // 结果集长度为0则代表没有该用户
    if (!user.length) {
        ctx.body = {
          code: 100,
          msg: '用户名或密码错误'
        }
        return;
      }
      // 数据库设置用户名唯一
    // 结果集长度为1则代表存在该用户
    if (user.length == 1) {
        const loginUser = {
          user_id: user[0].user_id,
          userName: user[0].username
        };
        // 保存用户信息到session
        ctx.session.adminUser = loginUser;
        ctx.body = {
          code: 200,
          user: loginUser,
          msg: '登录成功',
          token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM',
        }
        return;
      }
  }
}

module.exports = UserController;
