const Router = require('koa-router');
const rescode = require("koa-statuscode-pikson")
const config = require("../config")
const fs = require("fs")
const router = new Router()
const uuid = require('uuid')
const mongoose = require('mongoose')
const voteSchema = require('../schema/vote')
const Vote = mongoose.model('Vote', voteSchema)


module.exports = (Model) => {
    router.get("/q/vote/:questionId", async (ctx)=>{
        //额外一张表 {questionId,userId,answered答案，}
        const answer = ctx.query.answer
        console.log(ctx.userinfo)
        let questionId = ctx.params.questionId
        let userId = ctx.userinfo._id
        let qu = {userId,questionId}
        //判断是不是已经投过票
        const ifVoted = await Vote.countDocuments(qu)
        console.log(ifVoted)
        if (ifVoted) {
            //如果投票了就告诉他不能投了
            let obj = rescode('alreadyExists')
            obj.desc = "you have voted"
            ctx.body = obj
        } else {
            const res = await Model.updateOne({ _id: questionId }, { $inc: { "answerOptions.count": 1 } })
            let vote = new Vote({
                userId,
                questionId,
                answer,
            })
            vote.save()
            ctx.body = rescode('success')
            
        }
        
    });
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
            //需要创建唯一标识
            let uuid = uuid.v1()

            for (let i in img) {
                let base64data = img[i].replace(/^data:image\/\w+;base64,/, "")
                let dataBuffer = new Buffer(base64data,'base64')
                let filename = "assets/"+uuid+"_"+i+".jpg"

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