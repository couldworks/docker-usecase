import chai, { expect }  from 'chai'
import { MongoClient } from 'mongodb'
import Query from '../src/query'

export default (done) =>
{
  MongoClient.connect(Query.getUrl(), function(err, db) {
    expect(err).to.be.null
    db.close();
});

}
