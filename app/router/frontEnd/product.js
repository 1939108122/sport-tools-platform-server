module.exports = app=> {
    const { router, controller } = app;
    router.get('/default/product/getProByCategory/:id', controller.default.product.getProByCategory);
}