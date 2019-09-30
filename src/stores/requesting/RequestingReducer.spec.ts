import IAction from '../../models/IAction';
import requestingReducer, { initialState } from './RequestingReducer';
import IRequestingState from './models/IRequestingState';

describe('requestingReducer', () => {
  const requestActionType: string = 'SomeAction.REQUEST_SOMETHING';
  const requestActionTypeFinished: string = 'SomeAction.REQUEST_SOMETHING_FINISHED';

  it('returns default state with invalid action type', () => {
    const action: IAction<undefined> = { type: '' };

    expect(requestingReducer(undefined, action)).toEqual(initialState);
  });

  describe('handle REQUEST_* action types', () => {
    it('should add the request action type as a key on the state and assign the value as true', () => {
      const action: IAction<undefined> = { type: requestActionType };

      const actualResult: IRequestingState = requestingReducer(initialState, action);
      const expectedResult: IRequestingState = {
        [requestActionType]: true,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('handle REQUEST_*_FINISHED action types', () => {
    it('should update the request action type key on the state and assign the value to false', () => {
      const action: IAction<undefined> = { type: requestActionTypeFinished };

      const actualResult: IRequestingState = requestingReducer(initialState, action);
      const expectedResult: IRequestingState = {
        [requestActionType]: false,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
