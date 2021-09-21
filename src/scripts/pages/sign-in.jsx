import React, { useRef } from 'react';
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
  // eslint-disable-next-line no-console
  console.log(email, password);
  return {
    id: 1,
    email,
  };
};

const SignIn = ({ setLoggedUser }) => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSignIn = (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    mockSignIn(data)
      .then((user) => {
        setLoggedUser(user);
        history.push('/');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <div className="w-100">
      <Form onSubmit={onSignIn} className="shadow p-3 w-auto">
        <FormGroup>
          <Label>
            <span>Email</span>
            <Input className="mt-1" ref={emailRef} name="email" type="email" />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            <span>Password</span>
            <Input
              className="mt-1 mb-2"
              ref={passwordRef}
              name="password"
              type="password"
            />
          </Label>
        </FormGroup>
        <Button>Sign in</Button>
      </Form>
    </div>
  );
};

SignIn.propTypes = {
  setLoggedUser: PropTypes.func,
};

export default connect(mapStateToProps, usedActions)(SignIn);
