import IAction from '../models/IAction';

type Handler<T> = (state: T, action: IAction<any>) => T;

export default abstract class BaseReducer<T> {
  public initialState: T = {} as any;

  public reducer = (state: T = this.initialState, action: IAction<any>): T => {
    const handler: Handler<T> | undefined = this[action.type];

    if (action.error || !handler) {
      return state;
    }

    return handler(state, action);
  };
}
