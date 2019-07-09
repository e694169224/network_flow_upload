'use strict';
const assert = require('assert');

module.exports = {
  return(result = null, ...args) {
    const { response: res } = this;

    if (result && typeof result.code === 'object') {
      result = result.code;
    }
    if (result && result.code !== 200 && result.code !== undefined) {
      assert(typeof result.code === 'number', 'status code must be a number');
      const [ replacements ] = args;

      let message = result.message;
      if (replacements) {
        message = message.replace(/%s/g, replacements);
      }

      if (result.code === 500) {
        res.status = 500;
      } else {
        res.status = 200;
      }

      res.body = {
        code: result.code,
        message,
      };
      return;
    }

    res.type = 'application/json';
    res.status = 200;
    res.body = {
      code: 0,
      message: 'success',
      data: result,
    };
    return;
  },

  return_socket(result = null, event, ...args) {
    const { socket } = this;

    if (result && typeof result.code === 'object') {
      result = result.code;
    }

    if (result && result.code !== 200 && result.code !== undefined) {
      assert(typeof result.code === 'number', 'status code must be a number');

      const [ replacements ] = args;

      let message = result.message.split('error:')[1];
      if (replacements) {
        message = message.replace(/%s/g, replacements);
      }

      const body = {
        code: result.code,
        message,
      };

      socket.emit(event, JSON.stringify(body));

      return;
    }

    const body = {
      code: 0,
      message: 'success',
      data: result,
    };

    socket.emit(event, JSON.stringify(body));
  },
};
