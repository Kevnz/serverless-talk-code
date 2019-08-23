const Hapi = require('@hapi/hapi')
const LaLaLambda = require('lalalambda')


exports.deployment = async start => {

  const hello = require('./functions/hello')

  const server = Hapi.server()

  await server.register(LaLaLambda)

  server.route(hello)


  if (start) {
    await server.start()
    console.info(`Server started at ${server.info.uri} 🚀`)
  }
  return server
}

if (!module.parent) {
  exports.deployment(true)
}
