const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");

const { avatarHandler, pictureHandler, pictureResize } = require("../middleware/file.middleware");

const { saveAvatarInfo, savePictureInfo, savePictureWithId } = require("../controller/file.controller");

const { createMoment } = require("../controller/moment.controller");

const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);
fileRouter.post("/moment", verifyAuth, pictureHandler, createMoment, pictureResize, savePictureWithId);

module.exports = fileRouter;
