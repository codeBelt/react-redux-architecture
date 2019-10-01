import HttpErrorResponseModel from '../models/HttpErrorResponseModel';

export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType));

  const model = await effect(...args);
  const isError = model instanceof HttpErrorResponseModel;

  dispatch(createAction(`${actionType}_FINISHED`, model, isError));

  return model;
}

export function createAction(type, payload = undefined, error = false, meta = null) {
  return { type, payload, error, meta };
}
