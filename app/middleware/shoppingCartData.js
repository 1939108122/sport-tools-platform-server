module.exports = {
    async ShoppingCartData(ctx, data) {
        let shoppingCartData = [];
        for (let i = 0; i < data.length; i++) {
          const temp = data[i];
          const product = await ctx.service.product.getDetails(temp.product_id);
    
          let shoppingCartDataTemp = {
            id: temp.id,
            productID: temp.product_id,
            productName: product[0].product_name,
            productImg: product[0].product_picture,
            price: product[0].product_selling_price,
            num: temp.num,
            maxNum: Math.floor(product[0].product_num / 2),
            check: false
          };
    
          shoppingCartData.push(shoppingCartDataTemp);
        }
        return shoppingCartData;
    }
}