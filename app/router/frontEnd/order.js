module.exports = app=> {
    const { router, controller } = app;
    router.post('/default/order/getOrder', controller.default.order.getOrder);
    router.post('/default/order/addOrder', controller.default.order.addOrder);
    router.post('/default/order/returnOrder', controller.default.order.returnOrder);
}