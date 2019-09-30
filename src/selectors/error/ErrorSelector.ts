import { createSelector, ParametricSelector } from 'reselect';
import IErrorState from '../../stores/error/models/IErrorState';
import IStore from '../../models/IStore';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

/**
 * Returns a new object with the keys being the finished action type
 * (e.g. "SomeAction.REQUEST_*_FINISHED") and the value being a
 * HttpErrorResponseModel.
 */
const _selectRawErrors = (errorState: IErrorState, actionTypes: string[]): IErrorState => {
  return actionTypes.reduce((partialState: object, actionType: string) => {
    const model: HttpErrorResponseModel = errorState[actionType];

    if (model) {
      partialState[actionType] = model;
    }

    return partialState;
  }, {});
};

/**
 * Finds any errors matching the array of actionTypes and combines all error
 * messages in to a single string.
 */
const _selectErrorText = (errorState: IErrorState, actionTypes: string[]): string => {
  const errorList: string[] = actionTypes.reduce((errorMessages: string[], actionType: string) => {
    const model: HttpErrorResponseModel = errorState[actionType];

    if (model) {
      const { message, errors } = model;
      const arrayOfErrors: string[] = errors.length ? errors : [message];

      return errorMessages.concat(arrayOfErrors);
    }

    return errorMessages;
  }, []);

  return errorList.join(', ');
};

/**
 * Returns true or false if there are errors found matching the array of actionTypes.
 */
const _hasErrors = (errorState: IErrorState, actionTypes: string[]): boolean => {
  return actionTypes.map((actionType: string) => errorState[actionType]).filter(Boolean).length > 0;
};

export const selectRawErrors: ParametricSelector<IStore, string[], IErrorState> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectRawErrors
);

export const selectErrorText: ParametricSelector<IStore, string[], string> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectErrorText
);

export const hasErrors: ParametricSelector<IStore, string[], boolean> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _hasErrors
);
