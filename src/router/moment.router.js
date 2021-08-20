const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const { verifyAuth } = require("../middleware/auth.middleware");

const { 
    create,
    detail
 } = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get('/:momentId', detail);

module.exports = momentRouter;
