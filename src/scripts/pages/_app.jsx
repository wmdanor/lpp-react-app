import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Home from './index';
import NotFound from './404';
import SignIn from './sign-in';
import Profile from './profile';
import Friends from './profile/friends';
import Favorites from './profile/favorites';
import NavComponent from '../components/nav/nav.component';

const Router = ReactRouterDOM.BrowserRouter;
const { Route } = ReactRouterDOM;
const { Switch } = ReactRouterDOM;

export default function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <NavComponent />
        <div className="container-fluid p-0 d-flex flex-grow-1 flex-column align-items-center justify-content-center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/profile/:id/friends" component={Friends} />
            <Route exact path="/profile/:id/favorites" component={Favorites} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
