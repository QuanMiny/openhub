const errorTypes = require("../constants/error-types");
const service = require("../service/label.service");

const verifyNewLabel = async (ctx, next) => {
  // 1.添加的标签
  const { name } = ctx.request.body;
  // 2.判断标签在label表中是否存在
  const labelResult = await service.getLabelByName(name);
  if (labelResult) {
    const error = new Error(errorTypes.LABEL_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

const verifyLabelExists = async (ctx, next) => {
  // 1.取出要添加的所有标签
  const { labels } = ctx.request.body;

  // 2.判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = { name };
    // 不存在就创建新标签
    if (!labelResult) {
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
  verifyNewLabel,
};
