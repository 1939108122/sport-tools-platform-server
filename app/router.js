'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/frontEnd/user')(app);
    require('./router/frontEnd/resource')(app);
};
