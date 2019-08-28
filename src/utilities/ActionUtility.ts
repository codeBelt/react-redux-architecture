import { ReduxDispatch } from '../models/ReduxProps';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import IAction from '../models/IAction';

export default class ActionUtility {
  public static createThunkEffect<P>(actionType: string, effect: (...args: any[]) => Promise<P | HttpErrorResponseModel>, ...args: any[]) {
    return async (dispatch: ReduxDispatch<any>) => {
      dispatch({ type: actionType });

      const model: P | HttpErrorResponseModel = await effect(...args);

      dispatch({
        type: `${actionType}_FINISHED`,
        payload: model,
        error: model instanceof HttpErrorResponseModel,
      });
    };
  }

  public static createAction<T>(type: string, payload?: T, error: boolean = false, meta: any = null): IAction<T> {
    return { type, payload, error, meta };
  }
}
