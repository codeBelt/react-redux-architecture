import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import IStore from '../models/IStore';
import ShowReducer from './show/ShowReducer';

export default (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    router: connectRouter(history) as any,
    show: ShowReducer.reducer,
  };

  return combineReducers(reducerMap);
};
