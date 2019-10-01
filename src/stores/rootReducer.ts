import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import IStore from '../models/IStore';
import showsReducer from './shows/ShowsReducer';
import requestingReducer from './requesting/RequestingReducer';
import errorReducer from './error/ErrorReducer';
import toastsReducer from './toasts/ToastsReducer';

export default function rootReducer(history: History): Reducer<IStore> {
  const reducerMap: ReducersMapObject<IStore> = {
    error: errorReducer,
    requesting: requestingReducer,
    router: connectRouter(history) as any,
    shows: showsReducer,
    toasts: toastsReducer,
  };

  return combineReducers(reducerMap);
}
