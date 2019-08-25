import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import IStore from '../models/IStore';

export default (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    router: connectRouter(history) as any,
    // workOrders: WorkOrdersReducer.reducer,
  };

  return combineReducers(reducerMap);
};
