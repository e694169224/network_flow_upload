/* eslint-disable valid-jsdoc */
'use strict';
const defaultStrategies = require('../constant/default_strategy');

module.exports = function permit(permissionSet, strategies = {}) {
  strategies = Object.assign({}, defaultStrategies, strategies);

  /**
   * @param {Object} options
   * @property {string} options.type
   * @return {boolean}
   */
  return function _permit(options = {}) {
    const { type } = options;

    const permissions = permissionSet[type];

    if (!permissions) {
      throw new Error(`cannot find type(${type}) in permissions`);
    }
    const strategy = strategies[type];
    if (!strategy) {
      throw new Error(`cannot find type(${type}) in strategy`);
    }
    return strategy(options, permissions);
  };
};
