'use strict';

const Controller = require('egg').Controller;

class OssController extends Controller {
  async upload() {
    const { ctx, service } = this;
    const { request } = ctx;
    const { body } = request;

    const schema = {
      type: 'object',
      properties: {
        file_url: {
          type: 'string',
        },
        file_path: {
          type: 'string',
        },
      },
      required: [ 'file_url', 'file_path' ],
    };

    ctx.validateBySchema(schema, body);

    const {
      file_url,
      file_path,
    } = body;

    const result = await service.oss.uploadByURL({
      filepath: file_path,
      url: file_url,
    });

    return ctx.return({
      file_url: result,
    })
  }
}

module.exports = OssController;
