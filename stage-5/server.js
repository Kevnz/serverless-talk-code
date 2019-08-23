const Hapi = require('@hapi/hapi')
const LaLaLambda = require('lalalambda')
const dynamoose = require('dynamoose')

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1',
  })
  dynamoose.local()
}
exports.deployment = async start => {
  if (process.env.IS_OFFLINE) {
    createDynamooseInstance()
  }
  const get = require('./functions/get')(dynamoose)
  const create = require('./functions/create')(dynamoose)
  const list = require('./functions/list')(dynamoose)
  const update = require('./functions/update')(dynamoose)
  const server = Hapi.server()

  await server.register(LaLaLambda)

  server.route(get)
  server.route(create)
  server.route(list)
  server.route(update)

  if (start) {
    await server.start()
    console.info(`Server started at ${server.info.uri} 🚀`)
  }
  return server
}

if (!module.parent) {
  exports.deployment(true)
}
