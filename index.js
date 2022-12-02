const Koa = require("koa");
const app = new Koa();

app.use(async function cpp1(ctx, next) {
  console.log(1);
  const start = new Date();
  await next();
  console.log(2);
});

app.use((ctx, next) => {
  console.log("mid");
  const now = new Date();
  return next().then(() => {
    const ms = Date.now() - now;
    console.log(`mid ${ms}::ms`);
  });
});
app.use(async function cpp2(ctx, next) {
  console.log(3);
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(ctx.path);
  if (ctx.url === "/koa/test") {
    // 处理 db 或者进行 HTTP 请求
    // ctx.state.baiduHTML = await axios.get("http://baidu.com");
    app.keys = ["wmh"];
    ctx.cookies.set(
      "key1",
      JSON.stringify({
        name: "cpp",
        age: 30,
      }),
      { signed: false }
    );
    const val = ctx.cookies.get("key1");
    const appHtml = `
    <html>
    <head>
    <meta charset="utf-8">
    <title>This is Test</title>
    </head>
      <body>
      <h1>This is Test</h1>
      <div>${val}</div>
      <script>
        window.context = {
          state: ${JSON.stringify(val)}
        }
      </script>
      </body>
    </html>
  `;
    ctx.body = appHtml;
  } else if (ctx.url === "/koa/data") {
    ctx.body = [
      {
        name: "cpp",
        age: 31,
      },
      {
        name: "wmh",
        age: 24,
      },
    ];
  } else {
    ctx.body = "This is Home";
  }
});

app.listen(9000, "0.0.0.0", () => {
  console.log(`Server is starting http://localhost:9000`);
});
