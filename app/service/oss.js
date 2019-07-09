'use strict';

const Service = require('egg').Service;
const stream = require('stream');
const Codes = require('../constant/code');

class OssService extends Service {
  async uploadByURL(options) {
    const { ctx } = this;
    const { Failure } = ctx;

    const {
      filepath,
      url,
    } = options;

    const data = await ctx.curl(url, {});

    const bufferStream = new stream.PassThrough();
    bufferStream.end(data.data);

    const result = await ctx.oss.put(filepath, bufferStream);

    if (result.res.status !== 200) {
      throw new Failure(Codes.INTERNAL_SERVER_ERROR);
    }

    return result.url;
  }
}

module.exports = OssService;
