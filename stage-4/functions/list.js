const dynamodb = require('./dynamodb')

module.exports = {
  method: 'get',
  path: '/todos',
  options: {
    // By default the route id is used to name your lambda
    id: `list-dyno-items`,
    plugins: {
      lalalambda: true,
    },
    handler: async ({ params }) => {
      const dbParams = {
        TableName: process.env.DYNAMODB_TABLE,
      }

      return dynamodb.scan(dbParams).promise()
    },
  },
}
