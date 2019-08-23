import React from 'react'
import { usePost } from '@brightleaf/react-hooks'
import { Form, TextArea, TextBox } from 'react-form-elements'
const TodoForm = () => {
  const { postData } = usePost('/todos')
  return (
    <div>
      <Form
        onSubmit={values => {
          console.log('Name', values.userName)
          console.log('Email', values.userEmail)
          console.log('Message', values.message)
          postData(values)
        }}
      >
        <TextBox name="userName" label="Your Name" initialValue="" />
        <TextBox
          type="email"
          name="userEmail"
          label="Your Email"
          initialValue=""
        />
        <TextArea label="Your Message" name="message" />

        <button>Send</button>
      </Form>
    </div>
  )
}

export default TodoForm
