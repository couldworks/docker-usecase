import chai, { expect }  from 'chai'
import chaiHttp from 'chai-http'
import server from  '../src/index'
import shouldReturnHttp200 from './should-return-http-200'

chai.use(chaiHttp);
describe('Server', function() {
  it('should return http 200', shouldReturnHttp200)
})
