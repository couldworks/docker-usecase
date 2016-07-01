import chai, { expect }  from 'chai'
import chaiHttp from 'chai-http'
import server from  '../src/index'

chai.use(chaiHttp)

export default (done) =>
{
    chai.request(server.info.uri)
      .get('/index.html')
      .end(function(err, res)
      {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
      }
  )
}
