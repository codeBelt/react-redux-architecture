import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IStore from '../models/IStore';
import IAction from '../models/IAction';
import IError from '../models/IError';
import ToastStatusEnum from '../constants/ToastStatusEnum';
import ToastsAction from '../stores/toasts/ToastsAction';

const errorToastMiddleware = (): Middleware => (store: MiddlewareAPI<Dispatch, IStore>) => (next: Dispatch) => (action: IAction<any>): void => {
  if (action.error) {
    const errorAction = action as Required<IAction<IError>>;

    next(ToastsAction.add(errorAction.payload.message, ToastStatusEnum.Error));
  }

  next(action);
};

export default errorToastMiddleware;
