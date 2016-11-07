import OrientDB from 'orientjs'
import uuid from 'node-uuid'

let data = [
  {
    id: uuid.v1(),
    title: 'Comunicação rest',
    completed: false
  },
  {
    id: uuid.v1(),
    title: 'Configuração server',
    completed: true
  }
]

const connect = () => { return OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'root'
}) }

class Query
{

  getUrl ()
  {
    return url
  }

  getAll ()
  {
    let session = connect().use({
      name: 'TODO',
      username: 'root',
      password: 'root'
    })
  }

  getActive ()
  {
    return data
  }

  getCompleted ()
  {
    return data
  }

  update (task)
  {
    return db.put('document', null, task)
  }

  create (task)
  {
    let session = connect().use({
      name: 'TODO',
      username: 'root',
      password: 'root'
    })
    session.insert().into('task').set(task).one()
  }

  delete (task)
  {
    data = []
  }

  open () {
    return connect()
  }
}

export default new Query()
