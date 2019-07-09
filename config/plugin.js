'use strict';

// had enabled by egg
const path = require('path');

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.validateSchema = {
  enable: true,
  package: 'egg-validate-schema',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.return = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-return'),
};

exports.oss = {
  enable: true,
  package: 'egg-oss',
};
