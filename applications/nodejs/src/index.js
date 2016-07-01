import Hapi from 'hapi'
import inert from 'inert'

const server = new Hapi.Server()

server.connection({ port: 3000 })

server.register(inert, function (err) {

  server.route({
      method: 'GET',
      path: '/{filter}',
      handler: function (request, reply) {
         reply();
       }
  })

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '../public',
          listing: true
        }
      }
    }
  )
  server.start((err) => {

      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri)
  })
})

export default server
