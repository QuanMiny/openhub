const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");

const { create, reply, update } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId/reply", verifyAuth, reply);

commentRouter.patch("/:commentId", verifyAuth, update);

module.exports = commentRouter;
