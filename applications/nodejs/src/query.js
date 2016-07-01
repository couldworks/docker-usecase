import uuid from 'node-uuid'

let data = [
   {
     id: uuid.v1(),
     title: 'Teste',
     completed: false
   }
]

class Query
{

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
