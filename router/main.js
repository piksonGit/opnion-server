const Router = require("koa-router")
const user = require("./router/user")


module.exports = async (Model) => {

  var router = new Router();

  router.post("/login", async (ctx) => {
    let data = ctx.request.body
  })

  router.get("/logout", async (ctx) => {

  })

  router.post("/register", async (ctx) => {
    let data = ctx.request.body
  })

  return router
}