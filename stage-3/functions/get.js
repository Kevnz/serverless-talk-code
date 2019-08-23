const dynamodb = require('./dynamodb')

module.exports = {
  method: 'get',
  path: '/todos/{id}',
  options: {
    // By default the route id is used to name your lambda
    id: 'get-dyno-item',
    plugins: {
      lalalambda: true,
    },
    handler: async ({ params }) => {
      const dbParams = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: params.id,
        },
      }

      return dynamodb.get(dbParams).promise()
    },
  },
}
