import RequestingReducer from './RequestingReducer';

describe('RequestingReducer', () => {
  const requestActionType = 'SomeAction.REQUEST_SOMETHING';
  const requestActionTypeFinished = 'SomeAction.REQUEST_SOMETHING_FINISHED';

  it('returns default state with invalid action type', () => {
    const action = { type: '' };

    expect(RequestingReducer.reducer(undefined, action)).toEqual(RequestingReducer.initialState);
  });

  describe('handle REQUEST_* action types', () => {
    it('should add the request action type as a key on the state and assign the value as true', () => {
      const action = { type: requestActionType };

      const actualResult = RequestingReducer.reducer(RequestingReducer.initialState, action);
      const expectedResult = {
        [requestActionType]: true,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('handle REQUEST_*_FINISHED action types', () => {
    it('should update the request action type key on the state and assign the value to false', () => {
      const action = { type: requestActionTypeFinished };

      const actualResult = RequestingReducer.reducer(RequestingReducer.initialState, action);
      const expectedResult = {
        [requestActionType]: false,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
