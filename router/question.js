const Router = require('koa-router');
const rescode = require("koa-statuscode-pikson")
const config = require("../config")
const fs = require("fs")
const router = new Router()


module.exports = (Model) => {
    router.get("/", async (ctx) => {
        let page = ctx.query.page?ctx.query.page:1
        let limit = config.pageSize
        let condition = ctx.query
        delete condition.page
        let datas = await Model.find(condition).skip(page-1).limit(limit)
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
            console.log(ctx.userinfo)
            let data = ctx.request.body
            data["answerOptions"] = data["answerOptions"].map(function(value){
                let obj = {name:value,count:0}
                return obj
            })
            let img = data["image"]
            let imgarr = []
            console.log(img)
            console.log(typeof img)
            for (let i in img) {
                let base64data = img[i].replace(/^data:image\/\w+;base64,/, "")
                let dataBuffer = new Buffer(base64data,'base64')
                let filename = "assets/"+i+".jpg"
                fs.writeFileSync(filename,dataBuffer)
                imgarr.push(filename)

                
            }
            data["image"] = imgarr
            let question = new Model(data)
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
        return router
}