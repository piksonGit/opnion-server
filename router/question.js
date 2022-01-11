const Router = require('koa-router');
const rescode = require("koa-statuscode-pikson")
const router = new Router()


module.exports = (Model) => {
    router.get("/", async (ctx) => {
        let condition = ctx.query
        ctx.body = condition
        let datas = await Model.find(condition)
        let obj = rescode('success')
        obj['datas'] = datas
        ctx.body = obj
        
    })
        .get("/:id", async (ctx) => {
            let _id = ctx.params.id
            const id = _id
            let datas = await Model.findById(id)
            
            let obj = rescode('success')
            obj.datas = datas
            ctx.body = obj
        })

        .post("/q/add", async (ctx) => {
            let data = ctx.request.body
            let question = new Model(data)
            console.log(data)
            question.save()
            ctx.body = rescode("success")
        })

        .put("/q/:id", async (ctx) => {
            const id = ctx.params.id
            
            console.log("修改单个问题信息")
        })
        .del("/q/:id", async (ctx) => {
            console.log("删除单个问题信息")
        })
        .all("/users/:id", async (ctx) => {
            console.log("所有请求都会走这个")
        })
        return router
}