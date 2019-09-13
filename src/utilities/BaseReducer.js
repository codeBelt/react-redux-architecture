export default class BaseReducer {
  initialState = {};

  reducer = (state = this.initialState, action) => {
    const handler = this[action.type];

    if (!handler || action.error) {
      return state;
    }

    return handler(state, action);
  };
}
