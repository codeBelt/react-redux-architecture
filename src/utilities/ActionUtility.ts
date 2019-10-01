import { ReduxDispatch } from '../models/ReduxProps';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import IAction from '../models/IAction';

export async function createThunkEffect<P>(
  dispatch: ReduxDispatch<undefined | P | HttpErrorResponseModel>,
  actionType: string,
  effect: (...args: any[]) => Promise<P | HttpErrorResponseModel>,
  ...args: any[]
): Promise<P | HttpErrorResponseModel> {
  dispatch(createAction<undefined>(actionType));

  const model: P | HttpErrorResponseModel = await effect(...args);
  const isError: boolean = model instanceof HttpErrorResponseModel;

  dispatch(createAction<P | HttpErrorResponseModel>(`${actionType}_FINISHED`, model, isError));

  return model;
}

export function createAction<T = undefined>(type: string, payload?: T, error: boolean = false, meta: any = null): IAction<T> {
  return { type, payload, error, meta };
}
