const Service = require('egg').Service;

class ResourceService extends Service {
    // 获取轮播图资源
    async getResource() {
        const sql = 'select * from carousel';
        return await this.app.mysql.query(sql);
    }
}

module.exports = ResourceService;