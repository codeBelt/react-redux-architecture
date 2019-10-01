import IAction from '../models/IAction';
import { Reducer } from 'redux';

type ReducerMethod<T> = (state: T, action: IAction<any>) => T;
type ReducerMethods<T> = { [actionType: string]: ReducerMethod<T> };

const baseReducer = <T = any>(initialState: T, methods: ReducerMethods<T>): Reducer<T> => {
  return (state: T = initialState, action: IAction<any>): T => {
    // if the action type is used for a method name then this be a reference to
    // that class method.
    // if the action type is not found then the "method" const will be undefined.
    const method: ReducerMethod<T> | undefined = methods[action.type];

    // if the action type "method" const is undefined or the action is an error
    // return the state.
    if (!method || action.error) {
      return state;
    }

    return method(state, action);
  };
};

export default baseReducer;
