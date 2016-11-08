import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'
import Query from '../src/query'
import { url } from '../src/resources'

chai.use(chaiHttp)

export default (done) =>
{
  Query.create({title: 'Task', completed: true})
      .then((task) => {
        task.title = 'Tarefa Alterada'
        chai.request(server.info.uri)
              .put(url)
              .send(task)
              .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.not.be.null
                expect(res.body).to.have.property('title')
                expect(res.body.title).to.equal('Tarefa Alterada')
                done()
              })
      })
      .error((err) => { done(err) })
}
