/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
import * as ErrorAction from './ErrorAction';

export const initialState = {};

export default function errorReducer(state = initialState, action) {
  const { type, error, payload } = action;

  /*
   * Removes an HttpErrorResponseModel by it's id that is in the action payload.
   */
  if (type === ErrorAction.REMOVE) {
    // Create a new state without the error that has the same id as the payload.
    return Object.entries(state).reduce((newState, [key, value]) => {
      if (value.id !== payload) {
        newState[key] = value;
      }

      return newState;
    }, {});
  }

  /*
   * Removes all errors by returning the initial state which is an empty object.
   */
  if (type === ErrorAction.CLEAR_ALL) {
    return initialState;
  }

  /*
   * True if the action type has the key word '_FINISHED' then the action is finished.
   */
  const isFinishedRequestType = type.includes('_FINISHED');
  /*
   * True if the action type has the key word 'REQUEST_' and not '_FINISHED'.
   */
  const isStartRequestType = type.includes('REQUEST_') && !isFinishedRequestType;

  /*
   * If an action is started we want to remove any old errors because there is a new action has been re-dispatched.
   */
  if (isStartRequestType) {
    // Using ES7 Object Rest Spread operator to omit properties from an object.
    const { [`${type}_FINISHED`]: value, ...stateWithoutFinishedType } = state;

    return stateWithoutFinishedType;
  }

  /*
   * True if the action is finished and the error property is true.
   */
  const isError = isFinishedRequestType && Boolean(error);

  /*
   * For any start and finished actions that don't have errors we return the current state.
   */
  if (isError === false) {
    return state;
  }

  /*
   * At this point the "type" will be a finished action type (e.g. "SomeAction.REQUEST_*_FINISHED").
   * The payload will be a HttpErrorResponseModel.
   */
  return {
    ...state,
    [type]: payload,
  };
}
