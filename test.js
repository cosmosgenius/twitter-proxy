const nock = require('nock');
const request = require('supertest-as-promised');
const app = require('./lib');

describe('twitter-proxy api',function () {
    it('api should hit the /test/testme url', async () => {
        const twitterapi = nock('https://api.twitter.com/test/testme')
                            .get('/')
                            .reply(200, {
                                test: 'success'
                            });

        const res = await request(app.listen())
            .get('/test/testme/')
            .expect(200, {
                test: 'success'
            });
        twitterapi.done();
    });
});
