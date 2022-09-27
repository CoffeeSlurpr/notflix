import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <div className="m-auto text-center">
      <h1 className="pb-5">Sign In</h1>
      <Form style={{ width: '20rem' }}>
        <Form.Group className="mb-3">
          <Form.Control type="email" placeholder="Your e-mail address..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Your password..." />
        </Form.Group>
        <Button className="w-100 mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
