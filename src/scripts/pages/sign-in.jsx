import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoggedUserActions } from '../actions';

function mapStateToProps() {
  return {};
}

const usedActions = {
  setLoggedUser: LoggedUserActions.setUser,
};

const mockSignIn = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password required');
  }
  return {
    id: 1,
    email,
    username: 'example',
    age: 20,
  };
};

const SignIn = ({ setLoggedUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const [signInError, setSignInError] = useState('');

  const onSignIn = (e) => {
    e.preventDefault();

    mockSignIn({ email, password })
      .then((user) => {
        setLoggedUser(user);
        history.push('/');
      })
      .catch((err) => {
        setSignInError(err.message);
      });
  };

  return (
    <div className="container-fluid p-0 d-flex flex-grow-1 flex-column align-items-center justify-content-center">
      <div className="w-100">
        <Form
          onSubmit={onSignIn}
          className="shadow p-5 w-auto d-flex flex-column container"
        >
          <h2 className="mb-2 text-center">Sign in</h2>
          <FormGroup>
            <Label className="w-100">
              <span>Email</span>
              <Input
                className="mt-1"
                value={email}
                onChange={emailChange}
                type="email"
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className="w-100">
              <span>Password</span>
              <Input
                className="mt-1"
                value={password}
                onChange={passwordChange}
                type="password"
              />
            </Label>
          </FormGroup>
          {signInError && (
            <div className="mt-2">
              <small className="text-danger">{signInError}</small>
            </div>
          )}
          <Button className="w-100 mt-2">Sign in</Button>
        </Form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  setLoggedUser: PropTypes.func,
};

export default connect(mapStateToProps, usedActions)(SignIn);
