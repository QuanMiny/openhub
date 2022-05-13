const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");

const { verifyNewLabel } = require("../middleware/label.middleware");

const { create, list } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

labelRouter.post("/", verifyNewLabel, verifyAuth, create);
labelRouter.get("/", list);

module.exports = labelRouter;
