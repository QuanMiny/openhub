const service = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = {
      code: 200,
      msg: "创建标签成功~",
      data: null,
    };
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await service.getLabels(limit, offset);
    ctx.body = {
      code: 200,
      msg: "获取标签成功~",
      data: result,
    };
  }
}

module.exports = new LabelController();
