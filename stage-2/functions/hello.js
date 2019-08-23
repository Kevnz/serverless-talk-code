

module.exports = {
  method: 'get',
  path: '/hello/{name?}',
  options: {
    // By default the route id is used to name your lambda
    id: `hello-world-2`,
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
