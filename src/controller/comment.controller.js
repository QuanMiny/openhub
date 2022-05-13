const service = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(momentId, content, id);
    ctx.body = {
      code: 200,
      msg: "发表评论成功~",
      data: null,
    };
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, commentId, id);
    ctx.body = {
      code: 200,
      msg: "回复评论成功~",
      data: null,
    };
  }

  async update(ctx, next) {
    const { commentId, content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = {
      code: 200,
      msg: "评论修改成功~",
      data: null,
    };
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = {
      code: 200,
      msg: "评论删除成功~",
      data: null,
    };
  }
  
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = {
      code: 200,
      msg: "获取评论成功~",
      data: result,
    };
  }
}

module.exports = new CommentController();
