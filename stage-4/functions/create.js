const uuid = require('uuid')
const dynamodb = require('./dynamodb')

module.exports = {
  method: 'post',
  path: '/todos',
  options: {
    // By default the route id is used to name your lambda
    id: `post-dyno-create`,
    plugins: {
      lalalambda: true,
    },
    handler: async (r, h) => {
      try {
        console.log('the post is hit')
        console.log('payload', r.payload)
        const timestamp = new Date().getTime()
        const data = r.payload
        console.log('data', data)
        if (typeof data.text !== 'string') {
          console.log('Validation Failed')
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't create the todo item.",
          }
        }
        console.log('passed validation')
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
        console.log('item params', params)
        const item = await dynamodb.put(params).promise()
        console.log('item', item)
        return params.Item
      } catch (err) {
        console.log('sad fail')
        console.log('error', err)
        return {
          failed: true,
          error: err,,
        }
      }
    },
  },
}
