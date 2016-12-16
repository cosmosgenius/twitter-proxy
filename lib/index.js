const Koa = require('koa');
const cors = require('kcors');
const app = new Koa();

app.use(cors());

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

module.exports = app;
