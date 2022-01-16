const jwt = require("jsonwebtoken")
const config = require("../config")
const rescode = require("koa-statuscode-pikson")
module.exports = function() {
  let mid = async function (ctx, next) {
    try {
      let token = ctx.header.authorization
      let payload = token.split(' ')[1]
      ctx.userinfo = jwt.verify(payload, config.secret)
      await next()
    } catch(e) {
      let obj = rescode("noPermission")
      obj.msg = "token wrong"
      ctx.body = obj
    }
    
  }
  mid.unless = require('koa-unless')
  return mid
}