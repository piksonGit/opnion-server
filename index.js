const bodyParser = require("koa-bodyparser")
const Koa = require('koa')
const koajwt = require('koa-jwt')
const cors = require('koa2-cors');
var Router = require('koa-router');
const loginauth = require('./middleware/loginauth')
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
app.on('error', (err, ctx) =>
  console.error('server error', err)
)
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err)
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}
app.use(cors())
app.use(bodyParser())
app.use(loginauth)
app.use(koajwt({ secret: 'zhangranran' }).unless({
path: ['/user/login', '/user/register','/question',/^\/question\/(\d|\w)*$/]
}))
router.use(handler)
router.use("/admin",aRoute.routes(),aRoute.allowedMethods())
router.use("/question",qRoute.routes(),qRoute.allowedMethods())
router.use("/user",uRoute.routes(),uRoute.allowedMethods())



app.use(router.routes())

app.listen(3000)