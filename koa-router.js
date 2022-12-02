const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = "Hello World CPP";
});

router.get("/api/users", (ctx) => {
  const resData = [
    {
      id: 1,
      name: "小明",
      age: 18,
    },
    {
      id: 2,
      name: "小红",
      age: 19,
    },
    {
      id: 3,
      name: "cpp",
    },
  ];

  ctx.body = resData;
});

router.post("/users", async (ctx) => {
  // 使用了koa-bodyparser才能从ctx.request拿到body
  const postData = ctx.request.body;
  console.log(postData, "PPP");
  // 使用fs.promises模块下的方法，返回值是promises
  await fs.promises.appendFile(
    path.join(__dirname, "db.txt"),
    JSON.stringify(postData)
  );

  // ctx.body = postData;
  ctx.response.body = postData;
});

app.use(router.routes());
app.use(router.allowedMethods());
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`);
});
