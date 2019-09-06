/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
import IErrorState from './models/IErrorState';
import IAction from '../../models/IAction';
import ErrorAction from './ErrorAction';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

export default class ErrorReducer {
  public static readonly initialState: IErrorState = {};

  public static reducer(state: IErrorState = ErrorReducer.initialState, action: IAction<any>): IErrorState {
    const { type, error, payload } = action;

    /*
     * Removes a specific error by it's id.
     */
    if (type === ErrorAction.REMOVE) {
      return Object.entries(state).reduce((newState: object, [key, value]: [string, HttpErrorResponseModel]) => {
        if (value.id !== payload) {
          newState[key] = value;
        }

        return newState;
      }, {});
    }

    /*
     * Removes all the stored errors.
     */
    if (type === ErrorAction.CLEAR_ALL) {
      return ErrorReducer.initialState;
    }

    /*
     * If the action type has the key word 'REQUEST_' and not '_FINISHED' then we
     * want to remove the old error because there is a new request happening.
     */
    const isStartRequestType: boolean = [type.includes('REQUEST_') === true, type.includes('_FINISHED') === false].every(Boolean);

    if (isStartRequestType === true) {
      return Object.entries(state).reduce((newState: object, [key, value]: [string, HttpErrorResponseModel]) => {
        if (key !== `${type}_FINISHED`) {
          newState[key] = value;
        }

        return newState;
      }, {});
    }

    /*
     * If the action type has the key word '_FINISHED' we use the type as the key value
     * for the error.
     */
    const isFinishedRequestType: boolean = type.includes('_FINISHED');
    const isError: boolean = [isFinishedRequestType, error].every(Boolean);

    if (isError === false) {
      return state;
    }

    return {
      ...state,
      [type]: payload!,
    };
  }
}
