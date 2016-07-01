import chai, { expect }  from 'chai'
import chaiHttp from 'chai-http'
import server from  '../src/index'

chai.use(chaiHttp)

export default (done) =>
{
    chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res)
      {
          expect(res).to.have.status(200)
          done()
      }
  )
}
