const Koa = require('koa');
const cors = require('kcors');
const app = new Koa();
const mount = require('koa-mount');

const twitter = new Koa();

twitter.use(function (ctx) {
    ctx.status = 200;
    const path = `https://api.twitter.com${ctx.url}`;
    ctx.body = {
        url: path,
        headers: ctx.headers,
        body: ctx.request.body
    };
});

app.use(cors())
    .use(mount('/', twitter));

module.exports = app;
