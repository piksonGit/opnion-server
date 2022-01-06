const Router = require('koa-router')

const mongoose = require("mongoose")
const userSchema = require("../Schema/user")

main().catch(err => console.log(err))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/test')
    const User = mongoose.model('users',userSchema)
    const user = new User({username:'bokeh'})
    await user.save()
}

const router = new Router()

router.get("/",async (ctx) => {
    console.log("查询用户列表")
})
    .get("/:id",async(ctx) => {
        console.log("获取单个用户信息")
    })

    .post("/",async(ctx) => {
        console.log("添加用户")
    })
    
    .put("/:id",async(ctx) => {
        console.log("修改单个用户信息")
    })
    .del("/:id", async(ctx) => {
        console.log("删除单个用户信息")
    })
    .all("/users/:id",async(ctx) => {
        console.log("所有请求都会走这个")
    })


    module.exports = router