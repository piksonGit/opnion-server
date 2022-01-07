const Router = require('koa-router')
const userSchema = require('../schema/user')
const rescode = require("koa-statuscode-pikson")
module.exports = (Model) => {
  const router = new Router()
  router.post("/register",async(ctx) => {
    //邮箱要唯一
    let user = new Model(ctx.request.body)
    user.save()
    console.log(ctx.request.body)
    ctx.body = ctx.request.body

  })
  router.post("/login",async(ctx) => {
    let {email,password} = ctx.request.body

    if (!email || !password) {
      ctx.body = rescode("lackOfParameters")
      return 

    }
    let sign = await Model.countDocuments({email,password})
    if (sign) {
      //jwt
      
      ctx.body = rescode("success")
    } else {
      ctx.body = rescode("noPermission")

    }
  })

  return router

}