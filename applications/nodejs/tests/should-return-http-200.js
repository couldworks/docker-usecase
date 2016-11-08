import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'
import { url } from '../src/resources'

chai.use(chaiHttp)

export default (done) =>
{
  chai.request(server.info.uri)
      .get('/')
      .end(function (err, res)
      {
        expect(res).to.have.status(200)
        done()
      }
  )
}
