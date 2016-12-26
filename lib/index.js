const Koa = require('koa');
const cors = require('kcors');
const app = new Koa();
const mount = require('koa-mount');
const rp = require('request-promise-native');

const twitter = new Koa();

twitter.use(async function (ctx) {
    ctx.status = 200;
    const path = `https://api.twitter.com${ctx.url}`;
    const responseev = await rp({
        uri: path,
        headers : {
            'authorization': ctx.headers.authorization
        },
        json: true,
        resolveWithFullResponse: true,
        simple: false
    });

    const resheaders = {
        'content-length': responseev.headers['content-length'],
        'content-type': responseev.headers['content-type'],
        'date': responseev.headers['date'],
        'expires': responseev.headers['expires'],
        'last-modified': responseev.headers['last-modified'],
        'x-access-level': responseev.headers['x-access-level'],
        'x-connection-hash': responseev.headers['x-connection-hash'],
        'x-content-type-options': responseev.headers['x-content-type-options'],
        'x-frame-options': responseev.headers['x-frame-options'],
        'x-rate-limit-limit': responseev.headers['x-rate-limit-limit'],
        'x-rate-limit-remaining': responseev.headers['x-rate-limit-remaining'],
        'x-rate-limit-reset': responseev.headers['x-rate-limit-reset'],
        'x-response-time': responseev.headers['x-response-time'],
        'x-transaction': responseev.headers['x-transaction'],
        'x-twitter-response-tags': responseev.headers['x-twitter-response-tags'],
        'x-xss-protection': responseev.headers['x-xss-protection']
    };

    ctx.set(resheaders);
    ctx.body = responseev.body;
    ctx.status = responseev.statusCode;
});

app.use(cors())
    .use(mount('/', twitter));

module.exports = app;
