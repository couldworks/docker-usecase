import shouldReturnHttp200 from './should-return-http-200'
import shouldReturnStaticFile from './should-return-static-file'
import shouldListernerPort3000 from './should-listerner-port-3000'

describe('Server', function() {
  it('should listing port 3000', shouldListernerPort3000)
  it('should return http 200', shouldReturnHttp200)
  it('should return static file', shouldReturnStaticFile)
})
