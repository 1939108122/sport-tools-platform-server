let methods = {
    datedifference(sDate1, sDate2) {
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
    }
}

module.exports = {
    async orderRentTime(ctx, data) {
        var timestamp = Date.parse(new Date());
        data.forEach( item => {
            item.remain_days = item.rent_month*30 - methods.datedifference(item.order_time, timestamp);
            let result = ctx.service.order.updateOrderRemainDays(item.remain_days, item.user_id, item.product_id);
        })
        return data;
    }
}