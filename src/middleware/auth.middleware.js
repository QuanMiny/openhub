const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service"); // userService
const authService = require("../service/auth.service"); // authService
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWuORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3.判断用户是否存在（用户不存在）
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4.判断密码和数据库密码是否一致（加密）
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  // 传入 user
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取请求头授权信息 token
  const authorization = ctx.headers.authorization;
  // 判断是否授权
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = async (ctx, next) => {
  // 1.获取参数
  const [ resourceKey ] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
