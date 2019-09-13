import IAction from '../models/IAction';

export default abstract class BaseReducer<T> {
  public initialState: T = {} as any;

  public reducer = (state: T = this.initialState, action: IAction<any>): T => {
    if (action.error || !this[action.type]) {
      return state;
    }

    return this[action.type](state, action);
  };
}
