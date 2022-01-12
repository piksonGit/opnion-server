const Router = require('koa-router')
const userSchema = require('../schema/user')
const rescode = require("koa-statuscode-pikson")
var jwt = require("jsonwebtoken")
const Secret = "zhangranran"
const router = new Router()
module.exports = (Model) => {
  
  router.post("/register",async(ctx) => {
    //邮箱要唯一
    let user = new Model(ctx.request.body)
    user.save()
    
    ctx.body = rescode("success")

  })
  router.post("/login",async(ctx) => {
    let {email,password} = ctx.request.body
    console.log(email,password)
    if (!email || !password) {
      ctx.body = rescode("lackOfParameters")
      return 

    }
    let sign = await Model.countDocuments({email,password})
    if (sign) {
      //jwt
      userinfo = await Model.findOne({email,password})
      let userToken = {email:userinfo.email}
      resObj = rescode("success")
      resobj["userinfo"] = userinfo
      resObj.token = jwt.sign(
        userToken,
        Secret,
        {expiresIn:'1h'},

      )
      ctx.body = resObj
    } else {

      ctx.body = rescode("noPermission")

    }
  })

  return router

}