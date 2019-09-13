export default class BaseReducer {
  initialState = {};

  reducer = (state = this.initialState, action) => {
    const handler = this[action.type];

    if (action.error || !handler) {
      return state;
    }

    return handler(state, action);
  };
}
