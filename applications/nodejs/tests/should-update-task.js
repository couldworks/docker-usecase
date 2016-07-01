import chai, { expect }  from 'chai'
import chaiHttp from 'chai-http'
import server from  '../src/index'
import Query from '../src/query'

chai.use(chaiHttp)

export default (done) =>
{
    let task = Query.getAll()[0];

    chai.request(server.info.uri)
      .put('/api/')
      .send({ title : "Tarefa Alterada" })
      .end(function(err, res)
      {
          expect(res).to.have.status(200)
          expect(Query.getAll()[0].title).to.equal("Tarefa Alterada")
          done()
      }
  )
}
