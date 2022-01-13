const Router = require('koa-router')
const userSchema = require('../schema/user')
const rescode = require("koa-statuscode-pikson")
var jwt = require("jsonwebtoken")
const Secret = "zhangranran"
const router = new Router()
module.exports = (Model) => {
  router.get("/info",async(ctx)=> {
    let _id = ctx.query._id
    let userinfo = Model.findById(_id)
    let obj = rescode("success")
    obj["datas"] = userinfo
    ctx.body = obj
  })
  router.post("/update",async(ctx)=> {
    let id=ctx.request.body._id
    let updateinfo = ctx.request.body
    delete updateinfo[""]
    await Model.updateOne({_id:id }, updateinfo);
    ctx.body = rescode("successs")
  })
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
      let resObj = rescode("success")
      resObj["userinfo"] = userinfo
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