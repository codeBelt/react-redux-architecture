import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import IStore from './models/IStore';
import rootStore from './stores/rootStore';
import App from './views/App';
import environment from 'environment';
import RootStore from './RootStore';
import { Provider as MobxProvider } from 'mobx-react';

(async (window: Window): Promise<void> => {
  const initialState: Partial<IStore> = {};
  const history: History = createBrowserHistory({ basename: environment.route.baseRoute });
  const store: Store<IStore> = rootStore(initialState, history);
  const rootStoreMobx = new RootStore();

  const rootEl: HTMLElement | null = document.getElementById('root');

  const render = (Component: typeof App, el: HTMLElement | null): void => {
    ReactDOM.render(
      <Provider store={store}>
        <MobxProvider rootStore={rootStoreMobx}>
          <Component history={history} dispatch={store.dispatch} />
        </MobxProvider>
        ,
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
