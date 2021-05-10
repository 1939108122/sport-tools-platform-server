module.exports = app=> {
    const { router, controller } = app;
    router.post('/admin/order/getList', controller.admin.order.getList);
    router.post('/admin/order/deleteOrder', controller.admin.order.deleteOrder);
}