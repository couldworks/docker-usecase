import chai, { expect }  from 'chai'
import server from  '../src/index'

export default (done) =>
{
      expect(server.info.uri).to.equal('http://localhost:3000')
}
