const bodyParser = require("koa-bodyparser")
const Koa = require('koa')

const cors = require('koa2-cors');
var Router = require('koa-router');
const adminRoute = require('./router/admin')
const userRouter = require('./router/user')
const userSchema = require('./schema/user')
const mongoose = require("mongoose")
const app = new Koa()
const router = new Router();
mongoose.connect('mongodb://localhost:27017/test')
const User = mongoose.model('User', userSchema)
let aRoute = adminRoute(User)
let uRoute = userRouter(User)
app.use(cors());
app.use(bodyParser())
router.use("/user",)
router.use("/admin",aRoute.routes(),aRoute.allowedMethods())
router.use("/user",uRoute.routes(),uRoute.allowedMethods())
router.get('/questions', async (ctx, next) => {
  ctx.body=questions
})
app.use(router.routes())

app.listen(3000)