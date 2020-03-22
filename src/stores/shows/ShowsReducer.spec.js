import ActionUtility from '../../utilities/ActionUtility';
import ShowsReducer from './ShowsReducer';
import ShowsAction from './ShowsAction';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

describe('ShowsReducer', () => {
  const showsReducer = new ShowsReducer();

  it('returns default state with invalid action type', () => {
    const action = ActionUtility.createAction('');

    expect(showsReducer.reducer(undefined, action)).toEqual(showsReducer.initialState);
  });

  describe(ShowsAction.REQUEST_SHOW_FINISHED, () => {
    it('should update show state', () => {
      const payload = new ShowModel({});
      const action = ActionUtility.createAction(ShowsAction.REQUEST_SHOW_FINISHED, payload);

      const actualResult = showsReducer.reducer(showsReducer.initialState, action);
      const expectedResult = {
        ...showsReducer.initialState,
        show: payload,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe(ShowsAction.REQUEST_EPISODES_FINISHED, () => {
    it('should update episodes state', () => {
      const payload = [new EpisodeModel({})];
      const action = ActionUtility.createAction(ShowsAction.REQUEST_EPISODES_FINISHED, payload);

      const actualResult = showsReducer.reducer(showsReducer.initialState, action);
      const expectedResult = {
        ...showsReducer.initialState,
        episodes: payload,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe(ShowsAction.REQUEST_CAST_FINISHED, () => {
    it('should update cast state', () => {
      const payload = [new CastModel({})];
      const action = ActionUtility.createAction(ShowsAction.REQUEST_CAST_FINISHED, payload);

      const actualResult = showsReducer.reducer(showsReducer.initialState, action);
      const expectedResult = {
        ...showsReducer.initialState,
        actors: payload,
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
