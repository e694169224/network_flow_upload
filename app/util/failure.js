'use strict';
class Failure extends Error {
  constructor(code, options = {}) {
    super(code);

    this.name = 'Failure';

    if (typeof code === 'object') {
      const options = code;
      this.code = options.code;
      this.message = options.message;
    }

    if (options.replacements) {
      this.message = options.replacements;
    }

    if (options.event) {
      this.event = options.event;
    }
  }
}

module.exports = Failure;
