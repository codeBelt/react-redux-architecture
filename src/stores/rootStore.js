import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import environment from 'environment';
import rootReducer from './rootReducer';

export default (initialState, history) => {
  const middleware = [environment.isDevelopment ? reduxFreeze : null, routerMiddleware(history), thunk].filter(Boolean);

  const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

  // store.subscribe(() => console.log(store.getState()));

  return store;
};
