import React from 'react'
import { Container } from 'react-bootstrap'

const fullMessage = (props) => {
  return (
    <Container>
        <h4>{props.to}</h4>
      <h1>{props.Subject}</h1>
      <p>{props.body}</p>
      <p>{props.time}</p>
    </Container>
  )
}

export default fullMessage
