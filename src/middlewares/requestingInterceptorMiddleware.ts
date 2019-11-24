import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IStore from '../models/IStore';
import IAction from '../models/IAction';
import { delay } from '../utilities/delay';

const actionTypeTimeStampMap: Map<string, number> = new Map();

const requestingInterceptorMiddleware: Middleware = (store: MiddlewareAPI<Dispatch, IStore>) => (next: Dispatch) => async (
  action: IAction<any>
): Promise<void> => {
  const isRequestType: boolean = action.type.includes('REQUEST_');
  const isFinishedRequestType: boolean = action.type.includes('_FINISHED');
  const isStartRequestType: boolean = action.type.includes('REQUEST_') && !isFinishedRequestType;

  if (isStartRequestType) {
    actionTypeTimeStampMap.set(action.type, new Date().getTime());
  }

  if (!action.error && isRequestType && isFinishedRequestType) {
    const minimumDelay: number = 500;
    const startRequestType: string = action.type.replace('_FINISHED', '');
    const dateTimeStarted: number = actionTypeTimeStampMap.get(startRequestType) ?? new Date().getTime();

    actionTypeTimeStampMap.delete(startRequestType);

    const dateTimeNow: number = new Date().getTime();
    const latency: number = dateTimeNow - dateTimeStarted;
    const remainder: number = minimumDelay - latency;
    const shouldDelayResponse: boolean = latency < minimumDelay;

    if (shouldDelayResponse) {
      await delay(remainder);
    }
  }

  next(action);
};

export default requestingInterceptorMiddleware;
