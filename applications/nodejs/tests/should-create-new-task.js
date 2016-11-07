import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'
import query from '../src/query'

chai.use(chaiHttp)

export default (done) =>
{
  chai.request(server.info.uri)
      .post('/api/')
      .send({
        title: 'Nova Tarefa',
        completed: false
      })
      .end(function (err, res)
      {
        expect(res).to.have.status(200)
        expect(res.body).to.not.be.null
        expect(res.body).to.have.property('id')
        done()
      }
  )
}
