'use strict';
function failure(options) {
  return async function failureMiddleware(ctx, next) {
    try {
      await next();
    } catch (ex) {
      ctx.failure(ex, options);
    }
  };
}

module.exports = failure;
