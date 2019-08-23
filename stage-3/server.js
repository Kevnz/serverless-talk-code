const Hapi = require('@hapi/hapi')
const LaLaLambda = require('lalalambda')

exports.deployment = async start => {
  const get = require('./functions/get')
  const create = require('./functions/create')
  const server = Hapi.server()

  await server.register(LaLaLambda)

  server.route(get)
  server.route(create)

  if (start) {
    await server.start()
    console.info(`Server started at ${server.info.uri} 🚀`)
  }
  return server
}

if (!module.parent) {
  exports.deployment(true)
}
