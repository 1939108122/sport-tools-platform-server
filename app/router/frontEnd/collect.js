module.exports = app=> {
    const { router, controller } = app;
    router.post('/default/collect/addCollect', controller.default.collect.addCollect);
    router.post('/default/collect/getCollect', controller.default.collect.getCollect);
    router.post('/default/collect/deleteCollect', controller.default.collect.deleteCollect);
}