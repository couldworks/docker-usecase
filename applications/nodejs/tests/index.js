import shouldReturnHttp200 from './should-return-http-200'
import shouldReturnStaticFile from './should-return-static-file'
import shouldListernerPort3000 from './should-listerner-port-3000'
import shouldReturnAllTasks from './should-return-all-tasks'
import shouldCreateNewTask from './should-create-new-task'
import shouldUpdateTask from './should-update-task'
import shouldDeleteTask from './should-delete-task'
import shouldConnectToMongo from './should-connect-to-mongo'

describe('Server', function () {
  it('should return http 200', shouldReturnHttp200)
  it('should return static file', shouldReturnStaticFile)
})

describe('Data Base', function () {
  it('should connect to db', shouldConnectToMongo)
    .timeout(3000)
})

describe('WEB Api', function () {
  it('should return all tasks', shouldReturnAllTasks)
  it('should create new task', shouldCreateNewTask)
  it('should update task', shouldUpdateTask)
  it('should delete task', shouldDeleteTask)
})
