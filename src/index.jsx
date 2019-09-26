import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import rootStore from './stores/rootStore';
import App from './views/App';
import environment from 'environment';

(async (window) => {
  const initialState = {};
  const history = createBrowserHistory({ basename: environment.route.baseRoute });
  const store = rootStore(initialState, history);

  const rootEl = document.getElementById('root');

  const render = (Component, el) => {
    ReactDOM.render(
      <Provider store={store}>
        <Component history={history} dispatch={store.dispatch} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
