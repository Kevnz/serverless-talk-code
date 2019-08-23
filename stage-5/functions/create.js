const uuid = require('uuid')

module.exports = dynamoose => ({
  method: 'post',
  path: '/todos',
  options: {
    // By default the route id is used to name your lambda
    id: `post-dyno-create`,
    plugins: {
      lalalambda: true,
    },
    handler: async (r, h) => {
      const ToDo = require('../models/todo')(dynamoose)
      try {
        const timestamp = new Date().getTime()
        const id = uuid.v1()
        const todo = new ToDo({
          id,
          text: r.payload.text,
          checked: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        })

        await todo.save()
        return ToDo.get(id)
      } catch (err) {
        console.log('error', err)
        return {
          failed: true,
          error: err,
        }
      }
    },
  },
})
