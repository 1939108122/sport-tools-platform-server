module.exports = app=> {
    const { router, controller } = app;
    router.post('/default/product/getProByCategory', controller.default.product.getProByCategory);
    router.get('/default/product/getCategory', controller.default.product.getCategory);
    router.post('/default/product/getProductBySearch', controller.default.product.getProductBySearch);
}