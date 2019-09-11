import HttpErrorResponseModel from '../models/HttpErrorResponseModel';

export default class ActionUtility {
  static async createThunkEffect(dispatch, actionType, effect, ...args) {
    dispatch(ActionUtility.createAction(actionType));

    const model = await effect(...args);
    const isError = model instanceof HttpErrorResponseModel;

    dispatch(ActionUtility.createAction(`${actionType}_FINISHED`, model, isError));

    return model;
  }

  static createAction(type, payload, error = false, meta = null) {
    return { type, payload, error, meta };
  }
}
