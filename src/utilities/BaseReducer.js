export default function baseReducer(initialState, methods) {
  return (state = initialState, action) => {
    // if the action type is used for a method name then this be a reference to
    // that class method.
    // if the action type is not found then the "method" const will be undefined.
    const method = methods[action.type];

    // if the action type "method" const is undefined or the action is an error
    // return the state.
    if (!method || action.error) {
      return state;
    }

    return method(state, action);
  };
}
