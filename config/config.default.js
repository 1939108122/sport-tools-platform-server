/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618920677064_1372';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    client:{
      host:'localhost',
      port:'3306',
      user:'root',
      database:'sport-tools-platform',
      password:'root',
    },
    app:true,
    agent:false
  }

  config.security = {
    csrf:{
      enable:false
    },
    domainWhiteList:['*']
  }
  config.cors = {
    // credentials:true, // cook跨域
    origin: '*',
    allowMethods:'GET,HEAD,PUT,DELETE,PATCH,OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
