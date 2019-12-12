import * as chai from 'chai'
import chaiHttp = require('chai-http')
import app from '../src/App'

chai.use(chaiHttp)

describe('GET api/v1/characters', () => {
  it('responds with message status 200', () => {
    return chai.request(app)
  })
})