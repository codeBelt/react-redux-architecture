import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, History } from 'history';
import App from './views/App';
import environment from 'environment';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import { rootStore } from './stores/rootStore';

// configure({ enforceActions: "always" });

(async (window: Window): Promise<void> => {
  // const initialState: Partial<unknown> = {};
  const browserHistory: History = createBrowserHistory({ basename: environment.route.baseRoute });

  const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

  const rootEl: HTMLElement | null = document.getElementById('root');

  const render = (Component: typeof App, el: HTMLElement | null): void => {
    ReactDOM.render(
      <Provider rootStore={rootStore}>
        <Component history={history} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
