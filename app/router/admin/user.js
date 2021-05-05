module.exports = app=> {
    const { router, controller } = app;
    router.post('/admin/user/login', controller.admin.user.login);
}