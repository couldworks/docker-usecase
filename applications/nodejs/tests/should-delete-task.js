import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'
import Query from '../src/query'
import { url } from '../src/resources'

chai.use(chaiHttp)

export default (done) =>
{
  Query.create({title: 'Removed Task', completed: true})
    .then((task) => {
      chai.request(server.info.uri)
          .delete(url + task.id)
          .end(function (err, res)
          {
            expect(res).to.have.status(200)
            Query.getById(task.id).then((tasks) => {
              expect(tasks).to.have.length(0)
              done()
            })
          })
    })
    .error((err) => { done(err) })
}
