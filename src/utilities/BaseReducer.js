export default class BaseReducer {
  initialState = {};

  reducer = (state = this.initialState, action) => {
    if (action.error || !this[action.type]) {
      return state;
    }

    return this[action.type](state, action);
  };
}
