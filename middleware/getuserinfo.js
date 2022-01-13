const jwt = require("jsonwebtoken")
const config = require("../config")
module.exports = async function(ctx,next){
  
  let token = ctx.header.authorization
  let payload = token.split(' ')[1]
  ctx.userinfo = jwt.verify(payload, config.secret)
  
  await next()
}