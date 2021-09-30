/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

GuardedRoute.propTypes = {};

export default GuardedRoute;
