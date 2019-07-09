'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534991142550_4690';
  config.jwt_secret = '_1534991142550_4690';

  // add your config here
  config.middleware = [ 'failure' ];
  // config.middleware = [ 'xml' ];

  config.bodyParser = {
    jsonLimit: '5mb',
  };

  config.security = {
    csrf: { enable: false },
  };

  config.validateSchema = {
    removeAdditional: 'failing',
    ownProperties: true,
    coerceTypes: 'array',
    useDefaults: true,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE,PATCH',
  };

  config.oss = {
    client: {
      accessKeyId: '<Your accessKeyId>',
      accessKeySecret: '<Your accessKeySecret>',
      bucket: '<Your bucket>',
      endpoint: '<Your endpoint>',
      timeout: '60s',
      version: '2017-03-21',
    },
  };

  return config;
};
