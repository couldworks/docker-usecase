import { MongoClient } from 'mongodb'
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
const url = 'mongodb://localhost:27017/'

class Query
{

  getUrl()
  {
    return url;
  }

  getAll()
  {
    return data;
  }

  getActive()
  {
    return data;
  }

  getCompleted()
  {
    return data;
  }

  update(task)
  {
     data[0] = task;
  }

  create(task)
  {
    data.push(task)
  }

  delete(task)
  {
    data = []
  }
}

export default new Query()
