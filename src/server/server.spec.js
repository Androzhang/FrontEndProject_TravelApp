const request = require('supertest')
const app = require('./server')
import 'babel-polyfill'
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/test')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('value')
  })
})
