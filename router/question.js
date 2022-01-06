const Router = require('koa-router');

const router = new Router()

router.get("/",async (ctx) => {
    console.log("查询问题列表")
})
    .get("/:id",async(ctx) => {
        console.log("获取单个问题信息")
    })

    .post("/",async(ctx) => {
        console.log("添加问题")
    })
    
    .put("/:id",async(ctx) => {
        console.log("修改单个问题信息")
    })
    .del("/:id", async(ctx) => {
        console.log("删除单个问题信息")
    })
    .all("/users/:id",async(ctx) => {
        console.log("所有请求都会走这个")
    })


    module.exports = router