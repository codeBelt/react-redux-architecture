import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import environment from 'environment';
import rootReducer from './rootReducer';
import errorToastMiddleware from '../middlewares/errorToastMiddleware';

export default (initialState, history) => {
  const middleware = [environment.isDevelopment ? reduxFreeze : null, thunk, routerMiddleware(history), errorToastMiddleware()].filter(Boolean);

  const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

  // store.subscribe(() => console.log(store.getState()));

  return store;
};
