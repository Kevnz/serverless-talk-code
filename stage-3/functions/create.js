const uuid = require('uuid')
const dynamodb = require('./dynamodb')

module.exports = {
  method: 'post',
  path: '/todos',
  options: {
    id: 'post-dyno-create',
    plugins: {
      lalalambda: true,
    },
    handler: async (r, h) => {
      try {
        const timestamp = new Date().getTime()
        const data = r.payload
        if (typeof data.text !== 'string') {
          console.info('Validation Failed')
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't create the todo item.",
          }
        }

        const params = {
          TableName: process.env.DYNAMODB_TABLE,
          Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        }

        return await dynamodb.put(params).promise()
      } catch (err) {
        console.error('error', err)
        return {
          failed: true,
          error: err,
        }
      }
    },
  },
}
