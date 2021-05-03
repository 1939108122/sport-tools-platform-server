'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/frontEnd/user')(app);
    require('./router/frontEnd/resource')(app);
    require('./router/frontEnd/product')(app);
    require('./router/frontEnd/shopping')(app);
    require('./router/frontEnd/collect')(app);
    require('./router/frontEnd/order')(app);
};
