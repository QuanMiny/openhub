const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const {
  verifyLabelExists
} = require("../middleware/label.middleware");

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo,
  listByUserId
} = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
momentRouter.get("/user/:userId", listByUserId);
// 修改动态 1.用户必须登录 2.用户具备权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 给动态添加标签,
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图
momentRouter.get("/images/:filename", fileInfo);

module.exports = momentRouter;
