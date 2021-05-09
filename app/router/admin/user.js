module.exports = app=> {
    const { router, controller } = app;
    router.post('/admin/user/login', controller.admin.user.login);
    router.post('/admin/user/getList', controller.admin.user.getList);
    router.post('/admin/user/delUser/:id', controller.admin.user.delUser);
    router.post('/admin/user/findUser', controller.admin.user.findUser);
    router.post('/admin/user/updateUser', controller.admin.user.updateUser);
}