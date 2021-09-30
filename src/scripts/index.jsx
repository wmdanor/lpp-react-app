import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/_app';
import { store } from './reducers';

const onclick = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log(store.getState());
};

ReactDOM.render(
  <Provider store={store}>
    <button type="button" onClick={onclick}>
      Show state
    </button>
    <App />
  </Provider>,
  document.getElementById('root'),
);
