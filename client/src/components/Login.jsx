import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PageTransition from './PageTransition';

function Login() {
  return (
    <div className="m-auto text-center">
      <PageTransition>
        <h1 className="pb-5">Sign In</h1>
        <Form style={{ width: '20rem' }}>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Your e-mail address..." />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Your password..." />
          </Form.Group>
          <Button className="w-100 mt-2 gradient-primary" variant="primary">
            Login
          </Button>
        </Form>
      </PageTransition>
    </div>
  );
}

export default Login;
