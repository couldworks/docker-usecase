import Hapi from 'hapi'
import inert from 'inert'
import Query from './query'

const server = new Hapi.Server()

server.connection({ port: 3000, host:'localhost' })

server.register(inert, function (err) {

  server.route({
      method: 'GET',
      path: '/api/{filter?}',
      handler: function (request, reply) {
         reply(Query.getAll());
       }
  })

  server.route({
      method: 'POST',
      path: '/api/',
      handler: function (request, reply) {
         Query.create(request.payload)
         reply();
       }
  })

  server.route({
      method: 'PUT',
      path: '/api/',
      handler: function (request, reply) {
        Query.update(request.payload)
        reply();
       }
  })

  server.route({
      method: 'DELETE',
      path: '/api/',
      handler: function (request, reply) {
        Query.delete(request.payload)
         reply();
       }
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
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
