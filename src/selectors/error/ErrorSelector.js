import { createSelector } from 'reselect';

export const selectRawErrors = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  _selectRawErrors
);

export const selectErrorText = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  _selectErrorText
);

export const hasErrors = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  _hasErrors
);

/**
 * Returns a new object with the keys being the finished action type
 * (e.g. "SomeAction.REQUEST_*_FINISHED") and the value being a
 * HttpErrorResponseModel.
 */
function _selectRawErrors(errorState, actionTypes) {
  return actionTypes.reduce((partialState, actionType) => {
    const model = errorState[actionType];

    if (model) {
      partialState[actionType] = model;
    }

    return partialState;
  }, {});
}

/**
 * Finds any errors matching the array of actionTypes and combines all error
 * messages in to a single string.
 */
function _selectErrorText(errorState, actionTypes) {
  const errorList = actionTypes.reduce((errorMessages, actionType) => {
    const model = errorState[actionType];

    if (model) {
      const { message, errors } = model;
      const arrayOfErrors = errors.length ? errors : [message];

      return errorMessages.concat(arrayOfErrors);
    }

    return errorMessages;
  }, []);

  return errorList.join(', ');
}

/**
 * Returns true or false if there are errors found matching the array of actionTypes.
 */
function _hasErrors(errorState, actionTypes) {
  return actionTypes.map((actionType) => errorState[actionType]).filter(Boolean).length > 0;
}
