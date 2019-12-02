import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import reduxFreeze from 'redux-freeze';
import environment from 'environment';
import rootReducer from './rootReducer';
import IStore from '../models/IStore';
import errorToastMiddleware from '../middlewares/errorToastMiddleware';
import requestingInterceptorMiddleware from '../middlewares/requestingInterceptorMiddleware';

export default (initialState: Partial<IStore>, history: History): Store<IStore> => {
  const middleware: Middleware[] = [
    environment.isDevelopment ? reduxFreeze : null!,
    thunk,
    routerMiddleware(history),
    requestingInterceptorMiddleware,
    errorToastMiddleware(),
  ].filter(Boolean);

  const store: Store<IStore> = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

  // store.subscribe(() => console.log(store.getState()));

  return store;
};
