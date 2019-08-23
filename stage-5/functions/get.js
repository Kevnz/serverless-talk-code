module.exports = dynamoose => ({
  method: 'get',
  path: '/todos/{id}',
  options: {
    // By default the route id is used to name your lambda
    id: `get-dyno-item`,
    plugins: {
      lalalambda: true,
    },
    handler: async ({ params }) => {
      const ToDo = require('../models/todo')(dynamoose)
      return ToDo.get(params.id)
    },
  },
})
