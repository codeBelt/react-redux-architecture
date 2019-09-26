/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
export default class RequestingReducer {
  static initialState = {};

  static reducer(state = RequestingReducer.initialState, action) {
    // We only take actions that include 'REQUEST_' in the type.
    const isRequestType = action.type.includes('REQUEST_');

    if (isRequestType === false) {
      return state;
    }

    // Remove the string '_FINISHED' from the action type so we can use the first part as the key on the state.
    const requestName = action.type.replace('_FINISHED', '');
    // If the action type includes '_FINISHED'. The boolean value will be false. Otherwise we
    // assume it is a starting request and will be set to true.
    const isFinishedRequestType = action.type.includes('_FINISHED');

    return {
      ...state,
      [requestName]: isFinishedRequestType === false,
    };
  }
}
