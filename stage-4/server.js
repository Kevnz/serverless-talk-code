const Hapi = require('@hapi/hapi')
const LaLaLambda = require('lalalambda')

exports.deployment = async start => {
  const get = require('./functions/get')
  const create = require('./functions/create')
  const list = require('./functions/list')
  const update = require('./functions/update')
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
