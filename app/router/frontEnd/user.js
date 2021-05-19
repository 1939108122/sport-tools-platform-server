module.exports = app=> {
    const { router, controller } = app;
    router.post('/default/user/login', controller.default.user.login);
    router.post('/default/user/register', controller.default.user.register);
    router.post('/default/user/find', controller.default.user.find);
    router.post('/default/user/getUserInfoByID', controller.default.user.getUserInfoByID);
    router.post('/default/user/getUserList', controller.default.user.getUserList);
}