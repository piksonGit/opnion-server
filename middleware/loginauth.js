const config = require('../config.js')
const rescode = require("koa-statuscode-pikson")

module.exports = function(ctx, next) {
  console.log(ctx.path)
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 200
      ctx.body = rescode("noPermission")
    }
  })
}