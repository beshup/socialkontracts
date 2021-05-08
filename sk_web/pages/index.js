import React, { useState } from 'react';
import { Form, Row, Button } from 'react-bootstrap'

const loginUser = (data) => {
  return fetch('/login', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    return data
  }).catch(e => {
    console.log(e)
    return e
  })
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (evt) => {
      evt.preventDefault()
      loginUser({"email": email, "password": password}).then(res => {
          localStorage.setItem("email", email)
          location.href = '/dashboard'
      }).catch(e => {
          alert("error logging in, check console")
          console.log(e)
      })
  }

  return (
          <div className="login-box">
              <Form className="login-form" onSubmit={handleSubmit}>
                  <Form.Group controlId="formGroupEmail">
                      <div className="login-text">
                      <Form.Label><b>Email</b></Form.Label>
                      </div>
                      <div className="login-placeholder"></div>
                      <Form.Control type="email" onChange={e => setEmail(e.target.value)}/>
                      <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                      <div className="login-text">
                      <Form.Label><b>Password</b></Form.Label>
                      </div>
                      <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                  </Form.Group>
                  <Row className="justify-content-center mt-4">
                      <Button variant="primary" type="submit">
                          Login
                      </Button>
                  </Row>
              </Form>
          </div>
  )
}