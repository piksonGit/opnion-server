const Router = require('koa-router');
const rescode = require("koa-statuscode-pikson")

const router = new Router()


module.exports = (Model) => {
    router.get("/", async (ctx) => {
        console.log("查询问题列表")
    })
        .get("/:id", async (ctx) => {
            console.log("获取单个问题信息")
        })

        .post("/", async (ctx) => {
            let data = ctx.request.body
            let question = new Model(data)
            console.log(data)
            question.save()
            ctx.body = rescode("success")
        })

        .put("/:id", async (ctx) => {
            console.log("修改单个问题信息")
        })
        .del("/:id", async (ctx) => {
            console.log("删除单个问题信息")
        })
        .all("/users/:id", async (ctx) => {
            console.log("所有请求都会走这个")
        })
        return router
}