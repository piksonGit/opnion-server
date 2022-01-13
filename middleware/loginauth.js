const config = require('../config.js')
const rescode = require("koa-statuscode-pikson")
const jwt = require("jsonwebtoken")
module.exports = function(ctx, next) {
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 200
      ctx.body = rescode("noPermission")
    } else {
      let token = ctx.header.authorization
      let payload = token.split(' ')[1]
      ctx.userinfo = jwt.verify(payload,config.secret)
    }
  })
}