module.exports = dynamoose => ({
  method: 'get',
  path: '/todos',
  options: {
    // By default the route id is used to name your lambda
    id: `list-dyno-items`,
    plugins: {
      lalalambda: true,
    },
    handler: async ({ params }) => {
      const ToDo = require('../models/todo')(dynamoose)
      return ToDo.scan().exec()
    },
  },
})
