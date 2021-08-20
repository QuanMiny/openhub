const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const { verifyAuth } = require("../middleware/auth.middleware");

const { create } = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);

module.exports = momentRouter;
