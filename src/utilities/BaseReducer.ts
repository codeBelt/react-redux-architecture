import IAction from '../models/IAction';

type ReducerMethod<T> = (state: T, action: IAction<any>) => T;

export default abstract class BaseReducer<T> {
  public initialState: T = {} as any;

  public reducer = (state: T = this.initialState, action: IAction<any>): T => {
    // if the action type is used for a method name then this be a reference to
    // that class method.
    // if the action type is not found then the "method" const will be undefined.
    const method: ReducerMethod<T> | undefined = this[action.type];

    // if the action type "method" const is undefined or the action is an error
    // return the state.
    if (!method || action.error) {
      return state;
    }

    // Calls the method with the correct "this" and returns the modified state.
    return method.call(this, state, action);
  };
}
