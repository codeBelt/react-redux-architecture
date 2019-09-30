import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import IStore from '../models/IStore';
import showsReducer from './shows/ShowsReducer';
import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import toastsReducer from './toasts/ToastsReducer';

export default (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history) as any,
    shows: showsReducer,
    toasts: toastsReducer,
  };

  return combineReducers(reducerMap);
};
