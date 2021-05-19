'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 登录
  async login() {
    let { ctx } = this;
    let { userName, password } = ctx.request.body;
    let user = await ctx.service.user.login(userName, password);
    // 结果集长度为0则代表没有该用户
    if (!user.length) {
        ctx.body = {
          code: '004',
          msg: '用户名或密码错误'
        }
        return;
      }
      // 数据库设置用户名唯一
    // 结果集长度为1则代表存在该用户
    if (user.length == 1) {
        const loginUser = {
          user_id: user[0].userId,
          userName: user[0].userName
        };
        // 保存用户信息到session
        ctx.session.user = loginUser;
        ctx.body = {
          code: '001',
          user: loginUser,
          msg: '登录成功'
        }
        return;
      }
  }
  //  注册
  async register() {
    let { ctx } = this;
    let { userName, password, userPhoneNumber } = ctx.request.body;
    let user = await ctx.service.user.find(userName);
    if (user.length !== 0) {
        ctx.body = {
          code: '004',
          msg: '用户名已经存在，不能注册'
        }
        return;
      }

      try {
        // 连接数据库插入用户信息
        let registerResult = await ctx.service.user.register(userName, password, userPhoneNumber);
        // 操作所影响的记录行数为1,则代表注册成功
        if (registerResult.affectedRows === 1) {
          ctx.body = {
            code: '001',
            msg: '注册成功'
          }
          return;
        }
        // 否则失败
        ctx.body = {
          code: '500',
          msg: '未知错误，注册失败'
        }
      } catch (error) {
        reject(error);
      }
  }
//  寻找用户
  async find() {
    let { ctx } = this;
    let { userName } = ctx.request.body;
    const result = await ctx.service.user.find(userName);
    if (result.length == 0)
    {
        ctx.body = {
            code: '001',
            msg: '用户名不存在，可以注册'
        }
        return;
    }

    if (result.length == 1)
    {
        ctx.body = {
            code: '004',
            msg: '用户名已经存在，不能注册'
        }
        return;
    }

    //数据库设置用户名唯一，
    //若存在result.length != 1 || result.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
        code: '500',
        msg: '未知错误'
    }
  }

  //  通过Id查找用户详细信息
  async getUserInfoByID() {
    let { ctx } = this;
    let { userId } = ctx.request.body;
    const result = await ctx.service.user.getUserInfoByID(userId);
    if (result.length == 0)
    {
        ctx.body = {
            code: '004',
            msg: '查找失败',
            userInfo: {}
        }
        return;
    }

    if (result.length == 1)
    {
        ctx.body = {
            code: '001',
            msg: '查找成功',
            userInfo: result
        }
        return;
    }

    //数据库设置用户名唯一，
    //若存在result.length != 1 || result.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
        code: '500',
        msg: '未知错误'
    }
  }
    //获取所有用户信息
    async getUserList() {
        let result = await this.ctx.service.user.getUserList();
        this.ctx.body = {
            code: '001',
            msg: '请求成功',
            list: result
        }
    }
}

module.exports = UserController;
