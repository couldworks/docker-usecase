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

class Query
{

  _createConnection ()
    {
    return OrientDB({
      host: 'localhost',
      port: 2424,
      username: 'root',
      password: 'root'
    })
  }

  _createSession () {
    return this._createConnection().use({
      name: 'todo',
      username: 'root',
      password: 'root'
    })
  }

  getUrl ()
  {
    return url
  }

  getAll ()
  {
    return this._createSession().query('select * from task')
  }

  getById (id)
  {
    return this._createSession().query('select * from task where id = :id', {
      params: {id: id}
    }
   )
  }

  update (task)
  {
    return this._createSession().update(task['@rid'])
           .set({
             title: task.title,
             completed: task.completed
           }).one()
  }

  create (task)
  {
    let newTask = {
      id: uuid.v1(),
      title: task.title,
      completed: task.completed }

    return this._createSession()
        .insert()
        .into('task')
        .set(newTask)
        .one()
  }

  delete (task)
  {
    return this._createSession().delete().from('task')
     .where('id ="' + task + '"').limit(1).scalar()
  }

  open () {
    return this._createConnection()
  }
}

export default new Query()
