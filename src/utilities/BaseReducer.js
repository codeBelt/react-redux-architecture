export default function baseReducer(initialState, methods) {
  return (state = initialState, action) => {
    // if the action type is used for a method name then this be a reference to it.
    const method = methods[action.type];

    // if the action type "method" const is undefined or the action is an error
    // return the state.
    if (!method || action.error) {
      return state;
    }

    // if there is a valid method call it with the state and action objects.
    return method(state, action);
  };
}
