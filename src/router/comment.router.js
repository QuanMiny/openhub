const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const { create, reply, update } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId/reply", verifyAuth, reply);
// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);

module.exports = commentRouter;
