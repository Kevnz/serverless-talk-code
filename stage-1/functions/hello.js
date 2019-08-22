

module.exports = {
  method: 'get',
  path: '/hello/{name?}',
  options: {
    // By default the route id is used to name your lambda
    id: `hello-world`,
    plugins: {
      lalalambda: true,
    },
    handler: async ({ params }) => {

      return {
        greeting: `Hello ${params.name || 'World'}`,
      }
    },
  },
}
