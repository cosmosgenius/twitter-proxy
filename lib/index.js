const Koa = require('koa');
const cors = require('kcors');
const app = new Koa();
const mount = require('koa-mount');

const twitter = new Koa();

twitter.use(function (ctx) {
    ctx.body = 'hello';
    ctx.status = 200;
});

app.use(cors())
    .use(mount('/twitter', twitter));

module.exports = app;
