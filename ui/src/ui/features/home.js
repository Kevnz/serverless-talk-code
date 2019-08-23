import React, { useEffect } from 'react'
import { Container, Section, Title } from '@brightleaf/elements'
import { useGet } from '@brightleaf/react-hooks'

const Loading = () => (
  <div>
    <div className="loading-indicator"> </div>
  </div>
)
export default () => {
  const { data, error, loading, getUrl } = useGet('/todos')

  useEffect(() => {
    getUrl()
  }, [])
  console.log('data', data)

  const items = data.Items ? data.Items : []

  const todos = items.map(t => {
    return <li key={t.id}>{t.text}</li>
  })
  if (error) {
    return (
      <div className="App">
        <h1>Error Getting Data</h1>
      </div>
    )
  }

  return (
    <Section>
      <Title>My Todos</Title>
      {loading && <Loading />}
      <Container>
        <ul>{todos}</ul>
      </Container>
    </Section>
  )
}
