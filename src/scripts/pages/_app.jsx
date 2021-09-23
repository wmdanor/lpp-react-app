import React, { Suspense, lazy } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import NotFound from './404';
import NavComponent from '../components/nav/nav.component';
import Loading from './_loading';
import ErrorBoundary from './_error-boundary';

const Router = ReactRouterDOM.BrowserRouter;
const { Route } = ReactRouterDOM;
const { Switch } = ReactRouterDOM;

const Home = lazy(() => import('./index'));
const SignIn = lazy(() => import('./sign-in'));
const Profile = lazy(() => import('./profile/index'));
const Friends = lazy(() => import('./profile/friends'));
const Favorites = lazy(() => import('./profile/favorites'));
const Title = lazy(() => import('./title'));

const App = () => (
  <Router>
    <div className="min-vh-100 d-flex flex-column">
      <NavComponent />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={['/', '/titles']} component={Home} />
            <Route exact path="/titles/:id" component={Title} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/profile/:id/friends" component={Friends} />
            <Route exact path="/profile/:id/favorites" component={Favorites} />
            <Route exact component={NotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  </Router>
);

export default App;
