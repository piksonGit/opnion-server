const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors');
var Router = require('koa-router');

var router = new Router();


let user = 
{
        username: "小蓝帽",
        userid: "1",
        userDescribe: "小懒猫的一天是美好的",
        tel: "17545678901",
        gender: -1,
        age: "23",
        address: "重庆市涪陵区榨菜县",
        coin:"",
        imageSrc: "https://img.yzcdn.cn/vant/cat.jpeg",
        asked: [{
            id: "",
            
        }],
        answered: [{
            id: "",
            myOption: ''
        }]

    };

app.use(cors());
router.get('/user', (ctx, next) => {
  ctx.body = user
})
let questions = [{
  name: "我们的宇宙是真实的吗？",
  image: "",
  id: "1",
  type: "哲学",
  hasAnswered: true,
  readTime: 123,
  showData: false,
  status: 0,
  onwerId: "",
  options: [{ optionName: "是的", value: 300 }, { optionName: "不是", value: 200 }],
  wordCloud: [
    { wordName: "无限", value: 234 },
    { wordName: "有限", value: 22 },
    { wordName: "虚幻", value: 289 },
    { wordName: "真实", value: 67 },
    { wordName: "荒谬", value: 86 },
    { wordName: "探索", value: 90 },
    { wordName: "风景", value: 123 },
  ]

},
{
  name: "我们有自由意志吗？",
  image: "",
  id: "2",
  type: "音乐",
  options: [{ optionName: "有", value: 3000 }, { optionName: "没有", value: 2900, }],
},
{
  name: "上帝存在吗？",
  image: "",
  id: "3",
  type: "历史",
  options: [{ optionName: "存在", value: 3900 }, { optionName: "不存在", value: 2000, }],
},
{
  name: "人死后有灵魂吗？",
  image: "",
  id: "4",
  type: "音乐",
  options: [{ optionName: "有", value: 340 }, { optionName: "没有", value: 2000, }],
},
{
  name: "什么是最好的道德体系？",
  image: "",
  id: "5",
  type: "家庭",
  options: [{ optionName: "强制的", value: 300 }, { optionName: "自由的", value: 200, }],
},
{
  name: "什么是数字？",
  image: "",
  id: "6",
  type: "搞笑",
  options: [{ optionName: "是的", value: 300 }, { optionName: "不是", value: 200, }],
},
{
  name: "什么是数字？",
  image: "",
  id: "7",
  type: "汽车",
  options: [{ optionName: "数字是真实的", value: 200 }, { optionName: "数字是形式的", value: 200, }],
},
];
router.get('/questions',(ctx, next) => {
  ctx.body=questions
})
app.use(router.routes())

app.listen(3000)