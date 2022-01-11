
const rescode = require("koa-statuscode-pikson")
module.exports = function(ctx, next) {
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 200
      ctx.body = rescode("noPermission")
    }
  })
}