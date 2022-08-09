const fs = require('fs');

const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");
const { PICTURE_PATH } = require("../constants/file-path");

class MomentController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content )
    // 授权成功时 ctx.user 包含 id
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    ctx.body = {
      code: 200,
      msg: "发布成功~",
      data: null
    };
  }

  async createMoment(ctx, next) {
    const userId = ctx.user.id;
    try {
      const content = ctx.req.body.content;
      const files = ctx.req.files;
      
    //   前端判断
    // 1. 如果内容为空 图片为空 无触发
    // 3. 如果有内容 图片为空 创建动态 直接完成 
    // 2. 如果内容为空 有图片 创建空文本动态 并上传图片 next()
    // 4. 如果有内容 有图片 创建动态 并上传图片 next()

    if(files.length == 0) {
      // 将数据插入到数据库
      const result = await momentService.create(userId, content);
      ctx.body = {
        code: 200,
        msg: "发布成功~",
        data: result
      };
    } else {
      // 不管content内容 可上传空文本
      const result = await momentService.create(userId, content);
      // 用于图片上传
      ctx.momentId = result.insertId
      await next();
    }

    } catch (error) {
      console.log(error);
    }


    
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;
    // 2.根据id去查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = {
      code: 200,
      msg: "获取成功~",
      data: result
    };
  }

  async list(ctx, next) {
    // 1.获取数据(offset, size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    ctx.body = {
      code: 200,
      msg: "获取成功~",
      data: result
    };
  }

  async listByUserId(ctx, next) {
    // 1.获取数据(offset, size)
    const { userId } = ctx.params;
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentListByUserId(userId, offset, size);
    const result_count = await momentService.getMomentCountById(userId)
    ctx.body = {
      code: 200,
      msg: "获取成功~",
      data: {
        momentUserCount: result_count.momentUserCount,
        momentUserList: result
      }
    };
  }

  async update(ctx, next) {
    // 解构
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    // 更新动态内容
    const result = await momentService.update(content, momentId);
    ctx.body = {
      code: 200,
      msg: "更新成功~",
      data: null
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 200,
      msg: "删除成功~",
      data: null
    };
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = {
      code: 200,
      msg: "添加标签成功~",
      data: null
    };
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "lage"];
    if(types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
