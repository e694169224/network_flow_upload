'use strict';
const Codes = require('../constant/code');
const Failure = require('../util/failure');

module.exports = {
  get Failure() {
    return Failure;
  },

  failure(error) {
    if (error instanceof Failure) {
      this.logger.error(error);
      this.return(error);
    } else if (error instanceof Error) {
      this.logger.error(error);
      error = Codes.INTERNAL_SERVER_ERROR;
      return this.return(error);
    }
  },

  validateBySchema(...args) {
    const schemaValid = this.app.schemaValidator.validateSchema(args[0]);
    if (!schemaValid) {
      const errors = this.app.schemaValidator.errors;
      throw errors;
    }

    const valid = this.app.schemaValidator.validate(...args);
    if (!valid) {
      const errors = this.app.schemaValidator.errors;
      const message = this.app.schemaValidator.errorsText(errors, {
        separator: '\n',
      });

      throw new this.Failure(Codes.PARAM_VAILD_ERROR, {
        replacements: `${Codes.PARAM_VAILD_ERROR.message}:\n${message}`,
      });
    }
  },
};
