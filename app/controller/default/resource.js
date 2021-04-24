'use strict';

const Controller = require('egg').Controller;

class ResourceController extends Controller {

  // 获取轮播图资源
  async getCarouselImg() {
    let { ctx } = this;
    let carousel = await ctx.service.resource.getResource();
    ctx.body = {
      code: '001',
      carousel
    }
  }
}

module.exports = ResourceController;
