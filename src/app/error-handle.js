const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空！";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // Conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400; // 参数错误
      message = "密码不正确~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 参数错误
      message = "没有权限~";
      break;
    case errorTypes.LABEL_ALREADY_EXISTS:
        status = 409; // Conflict
        message = "标签已经存在~";
        break;
    default:
      status = 404;
      message = "NOT FOUND.";
  }
  ctx.body = {
    code: status || -1,
    data: null,
    msg: message || '失败',
  };

  // 保证返回状态是 200, 这样前端不会抛出异常
  ctx.status = 200
  
};

module.exports = errorHandler;
