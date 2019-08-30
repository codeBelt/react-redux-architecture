import { ReduxDispatch } from '../models/ReduxProps';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import IAction from '../models/IAction';
import IStore from '../models/IStore';

export type ThunkEffectCallback<P> = (model: P | HttpErrorResponseModel, dispatch: ReduxDispatch<any>, getState: () => IStore) => void;

export default class ActionUtility {
  public static createThunkEffect<P>(actionType: string, effect: (...args: any[]) => Promise<P | HttpErrorResponseModel>, ...args: any[]) {
    return async (dispatch: ReduxDispatch<any>, getState: () => IStore) => {
      dispatch(ActionUtility.createAction(actionType));

      const model: P | HttpErrorResponseModel = await effect(...args);
      const isError: boolean = model instanceof HttpErrorResponseModel;

      dispatch(ActionUtility.createAction(`${actionType}_FINISHED`, model, isError));
    };
  }

  public static createThunkEffectCallback<P>(actionType: string, effect: (...args: any[]) => Promise<P | HttpErrorResponseModel>, ...args: any[]) {
    return (callback: ThunkEffectCallback<P>) => {
      return async (dispatch: ReduxDispatch<any>, getState: () => IStore) => {
        dispatch(ActionUtility.createAction(actionType));

        const model: P | HttpErrorResponseModel = await effect(...args);
        const isError: boolean = model instanceof HttpErrorResponseModel;

        callback(model, dispatch, getState);

        dispatch(ActionUtility.createAction(`${actionType}_FINISHED`, model, isError));
      };
    };
  }

  public static createAction<T = undefined>(type: string, payload?: T, error: boolean = false, meta: any = null): IAction<T> {
    return { type, payload, error, meta };
  }
}
