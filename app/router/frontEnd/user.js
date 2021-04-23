module.exports = app=> {
    const { router, controller } = app;
    router.get('/default/userLogin', controller.default.user.login);
    router.post('/default/userRegister', controller.default.user.register);
    router.post('/default/userFind', controller.default.user.find);
}