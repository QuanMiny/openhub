const fileService = require("../service/file.service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    const result = await fileService.createAvatar(filename, mimetype, size, id);

    ctx.body = result;
  }
}

module.exports = new FileController();
