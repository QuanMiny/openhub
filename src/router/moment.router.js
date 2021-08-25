const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const {
  create,
  detail,
  list,
  update,
} = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
// 1.用户必须登录 2.用户具备权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

module.exports = momentRouter;
