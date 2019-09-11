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
      // Create a new state without the error that has the same id as the payload
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
     * If the action type has the key word '_FINISHED' then the start action is complete
     */
    const isFinishedRequestType: boolean = type.includes('_FINISHED');
    /*
     * If the action type has the key word 'REQUEST_' and not '_FINISHED' then we
     * want to remove the old error because there is a new request happening.
     */
    const isStartRequestType: boolean = type.includes('REQUEST_') && !isFinishedRequestType;

    if (isStartRequestType) {
      // remove the finished type that is associated with the start type because the start action has been re-dispatched
      const { [`${type}_FINISHED`]: value, ...stateWithoutFinishedType } = state;

      return stateWithoutFinishedType;
    }

    const isError: boolean = isFinishedRequestType && Boolean(error);

    if (isError === false) {
      return state;
    }

    return {
      ...state,
      [type]: payload,
    };
  }
}
