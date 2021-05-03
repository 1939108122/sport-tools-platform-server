module.exports = app=> {
    const { router, controller } = app;
    router.post('/default/shopping/getShoppingCart', controller.default.shopping.getShoppingCart);
    router.post('/default/shopping/addShoppingCart', controller.default.shopping.addShoppingCart);
    router.post('/default/shopping/updateShoppingCart', controller.default.shopping.updateShoppingCart);
    router.post('/default/shopping/deleteShoppingCart', controller.default.shopping.deleteShoppingCart);
}