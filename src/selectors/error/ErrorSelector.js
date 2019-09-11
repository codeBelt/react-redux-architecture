import { createSelector } from 'reselect';

export class ErrorSelector {
  static selectRawErrors(errorState, actionTypes) {
    return actionTypes.reduce((partialState, actionType) => {
      if (errorState[actionType]) {
        partialState[actionType] = errorState[actionType];
      }

      return partialState;
    }, {});
  }

  static selectErrorText(errorState, actionTypes) {
    const partialErrorState = ErrorSelector.selectRawErrors(errorState, actionTypes);

    const errorList = actionTypes.reduce((errorMessages, actionType) => {
      if (partialErrorState[actionType]) {
        const { message, errors } = partialErrorState[actionType];
        const arrayOfErrors = errors.length ? errors : [message];

        return errorMessages.concat(arrayOfErrors);
      }

      return errorMessages;
    }, []);

    return errorList.join(', ');
  }

  static hasErrors(errorState, actionTypes) {
    return actionTypes.map((actionType) => errorState[actionType]).filter(Boolean).length > 0;
  }
}

export const selectRawErrors = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  ErrorSelector.selectRawErrors
);

export const selectErrorText = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  ErrorSelector.selectErrorText
);

export const hasErrors = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  ErrorSelector.hasErrors
);
