import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { About, Main, Contacts, NotFound } from '../Pages';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppLoader from './AppLoader';
import { CartPopup } from '../Cart';
import './index.scss';
import ScrollToTop from './ScrollToTop';

const Router = ReactRouterDOM.BrowserRouter;
const { Route } = ReactRouterDOM;
const { Switch } = ReactRouterDOM;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      didMount: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        didMount: true,
      });
      const loader = document.getElementById('app-loader');
      loader.classList.add('hidden');
    }, 50);
  }

  render() {
    return (
      <div className={this.state.didMount ? '' : 'preload'}>
        <Router>
          <ScrollToTop />
          <AppLoader />
          <CartPopup />
          <AppHeader />
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/about" component={About} />
              <Route path="/contacts" component={Contacts} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <AppFooter />
        </Router>
      </div>
    );
  }
}

export default App;
