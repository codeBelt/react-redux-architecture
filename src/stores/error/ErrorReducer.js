/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
import ErrorAction from './ErrorAction';

export default class ErrorReducer {
  static initialState = {};

  static reducer(state = ErrorReducer.initialState, action) {
    const { type, error, payload } = action;

    /*
     * Removes a specific error by it's id.
     */
    if (type === ErrorAction.REMOVE) {
      // Create a new state without the error that has the same id as the payload
      return Object.entries(state).reduce((newState, [key, value]) => {
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
    const isFinishedRequestType = type.includes('_FINISHED');
    /*
     * If the action type has the key word 'REQUEST_' and not '_FINISHED' then we
     * want to remove the old error because there is a new request happening.
     */
    const isStartRequestType = type.includes('REQUEST_') && !isFinishedRequestType;

    if (isStartRequestType) {
      // remove the finished type that is associated with the start type because the start action has been re-dispatched
      const { [`${type}_FINISHED`]: value, ...stateWithoutFinishedType } = state;

      return stateWithoutFinishedType;
    }

    const isError = isFinishedRequestType && Boolean(error);

    if (isError === false) {
      return state;
    }

    return {
      ...state,
      [type]: payload,
    };
  }
}
