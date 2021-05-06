module.exports = app=> {
    const { router, controller } = app;
    router.post('/admin/user/login', controller.admin.user.login);
    router.post('/admin/user/getList', controller.admin.user.getList);
}