const Router = require('koa-router')
const rescode = require("koa-statuscode-pikson")

module.exports = (Model) => {

    const router = new Router()

    router.get("/", async (ctx) => {
        users = Model.find({})
        console.log("查询用户列表",users)
    })
        .get("/:id", async (ctx) => {
            console.log("获取单个用户信息")
        })
        .post("/", async (ctx) => {
            console.log("添加用户")
        })

        .put("/:id", async (ctx) => {
            console.log("修改单个用户信息")
        })
        .del("/:id", async (ctx) => {
            console.log("删除单个用户信息")
        })
        return router
}