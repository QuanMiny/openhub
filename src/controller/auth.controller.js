const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = {
      code: 200,
      msg: "登录成功~",
      data: { id, name, token },
    };
  }

  async success(ctx, next) {
    ctx.body = {
      code: 200,
      msg: "授权成功~",
      data: null
    };
  }
}

module.exports = new AuthController();
