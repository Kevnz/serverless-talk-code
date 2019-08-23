module.exports = dynamoose => {
  return dynamoose.model('ToDo', {
    id: String,
    text: String,
    checked: Boolean,
    createdAt: Number,
    updatedAt: Number,
  })
}
