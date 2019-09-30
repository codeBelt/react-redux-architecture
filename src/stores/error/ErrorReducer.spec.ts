import ErrorReducer from './ErrorReducer';
import ErrorAction from './ErrorAction';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import IAction from '../../models/IAction';
import IErrorState from './models/IErrorState';
import * as ActionUtility from '../../utilities/ActionUtility';

describe('ErrorReducer', () => {
  const requestActionType: string = 'SomeAction.REQUEST_SOMETHING';
  const requestActionTypeFinished: string = 'SomeAction.REQUEST_SOMETHING_FINISHED';
  const httpErrorResponseModel = new HttpErrorResponseModel();

  it('returns default state with invalid action type', () => {
    const action: IAction<undefined> = ActionUtility.createAction('');

    expect(ErrorReducer.reducer(undefined, action)).toEqual(ErrorReducer.initialState);
  });

  describe('handle REQUEST_*_FINISHED action types', () => {
    it('should add error to state with *_FINISHED action type as the key', () => {
      const action: IAction<HttpErrorResponseModel> = ActionUtility.createAction(requestActionTypeFinished, httpErrorResponseModel, true);

      const actualResult: IErrorState = ErrorReducer.reducer(ErrorReducer.initialState, action);
      const expectedResult: IErrorState = {
        [requestActionTypeFinished]: httpErrorResponseModel,
      };

      expect(actualResult).toEqual(expectedResult);
    });

    it('removes the the old error from state when a new action is dispatched for isStartRequestTypes', () => {
      const errorThatRemainsOnState = new HttpErrorResponseModel();
      const initialState = {
        [requestActionTypeFinished]: httpErrorResponseModel,
        idOfKeyThatShouldNotBeRemoved: errorThatRemainsOnState,
      };
      const action: IAction<HttpErrorResponseModel> = ActionUtility.createAction(requestActionType, httpErrorResponseModel, true);

      const actualResult: IErrorState = ErrorReducer.reducer(initialState, action);
      const expectedResult: IErrorState = {
        idOfKeyThatShouldNotBeRemoved: errorThatRemainsOnState,
      };

      expect(actualResult).toEqual(expectedResult);
    });

    it('should not add error to state without *_FINISHED action type', () => {
      const action: IAction<HttpErrorResponseModel> = ActionUtility.createAction(requestActionType, httpErrorResponseModel, true);

      const actualResult: IErrorState = ErrorReducer.reducer(ErrorReducer.initialState, action);
      const expectedResult: IErrorState = {};

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('removing an error action', () => {
    it('should remove error by id (which is the key on the state)', () => {
      const errorThatRemainsOnState = new HttpErrorResponseModel();
      const initialState: IErrorState = {
        [requestActionTypeFinished]: httpErrorResponseModel,
        idOfKeyThatShouldNotBeRemoved: errorThatRemainsOnState,
      };
      const action: IAction<string> = ActionUtility.createAction(ErrorAction.REMOVE, httpErrorResponseModel.id);

      const actualResult: IErrorState = ErrorReducer.reducer(initialState, action);
      const expectedResult: IErrorState = {
        idOfKeyThatShouldNotBeRemoved: errorThatRemainsOnState,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('clearing all error actions', () => {
    it('should remove all errors, making error state an empty object', () => {
      const initialState = {
        [requestActionTypeFinished]: httpErrorResponseModel,
      };
      const action: IAction<string> = ActionUtility.createAction(ErrorAction.CLEAR_ALL);

      const actualResult: IErrorState = ErrorReducer.reducer(initialState, action);
      const expectedResult: IErrorState = {};

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
