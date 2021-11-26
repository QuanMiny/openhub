const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const {APP_HOST, APP_PORT} = require("../app/config")

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 保存图片地址
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);

    ctx.body = '上传头像成功';
  }
}

module.exports = new FileController();
