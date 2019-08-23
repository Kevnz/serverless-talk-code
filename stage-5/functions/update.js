const uuid = require('uuid')

module.exports = dynamoose => ({
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
        const ToDo = require('../models/todo')(dynamoose)
        const timestamp = new Date().getTime()
        console.log('try it', {
          ...r.payload,
          updatedAt: timestamp,
        })
        await ToDo.update(
          {
            id: r.params.id,
          },
          {
            ...r.payload,
            checked: JSON.parse(r.payload.checked),
            updatedAt: timestamp,
          }
        )

        return ToDo.get(r.params.id)
      } catch (err) {
        console.log(err)
        return {
          failed: false,
        }
      }
    },
  },
})
