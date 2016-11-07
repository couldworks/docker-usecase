import chai, { expect } from 'chai'
import orientdb from 'node-orientdb-http'
import Query from '../src/query'

export default (done) =>
{
  let db = Query.open()
  db.list()
    .then(function (dbs) {
      done()
    })
    .catch(function (err) {
      done(err)
    })
}
