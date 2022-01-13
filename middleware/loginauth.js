const config = require('../config.js')
const rescode = require("koa-statuscode-pikson")
const jwt = require("jsonwebtoken")
module.exports = function(ctx, next) {
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 200
      ctx.body = rescode("noPermission")
    } else {
      ctx.userinfo = jwt.verify(token,config.secret)
    }
  })
}