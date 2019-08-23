const uuid = require('uuid')
const dynamodb = require('./dynamodb')

module.exports = {
  method: 'put',
  path: '/todos/{id}',
  options: {
    // By default the route id is used to name your lambda
    id: `put-dyno-update`,
    plugins: {
      lalalambda: true,
    },
    handler: async (r, h) => {
      try {
        const timestamp = new Date().getTime()
        const data = r.payload

        const params = {
          TableName: process.env.DYNAMODB_TABLE,
          Key: {
            id: r.params.id,
          },
          ExpressionAttributeNames: {
            '#todo_text': 'text',
          },
          ExpressionAttributeValues: {
            ':text': data.text,
            ':checked': JSON.parse(data.checked),
            ':updatedAt': timestamp,
          },
          UpdateExpression:
            'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
          ReturnValues: 'ALL_NEW',
        }

        return dynamodb.update(params).promise()
      } catch (err) {
        return {
          failed: true,
          error: err,
        }
      }
    },
  },
}
