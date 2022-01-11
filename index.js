const bodyParser = require("koa-bodyparser")
const Koa = require('koa')
const koajwt = require('koa-jwt')
const cors = require('koa2-cors');
var Router = require('koa-router');
const adminRoute = require('./router/admin')
const userRouter = require('./router/user')
const questionRouter = require("./router/question")
const userSchema = require('./schema/user')
const questionSchema = require('./schema/question')
const mongoose = require("mongoose")
const app = new Koa()
const router = new Router();
mongoose.connect('mongodb://localhost:27017/test')
const User = mongoose.model('User', userSchema)
const Question = mongoose.model('Question',questionSchema)
let aRoute = adminRoute(User)
let uRoute = userRouter(User)
let qRoute = questionRouter(Question)
app.use(cors())
app.use(bodyParser())
router.use("/admin",aRoute.routes(),aRoute.allowedMethods())
router.use("/question",qRoute.routes(),qRoute.allowedMethods())
router.use("/user",uRoute.routes(),uRoute.allowedMethods())



app.use(router.routes())
//jwt验证中间件
app.use(koajwt({secret:'zhangranran'}).unless({
  path:['/user/login','/user/register']
}))

app.listen(3000)