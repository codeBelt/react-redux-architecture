import ShowsAction from './ShowsAction';
import ActionUtility from '../../utilities/ActionUtility';
import { mockStoreFixture } from '../../__fixtures__/reduxFixtures';
import ShowModel from './models/shows/ShowModel';
import ShowsEffect from './ShowsEffect';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

describe('ShowsAction', () => {
  let store;

  beforeEach(() => {
    store = mockStoreFixture({
      shows: {
        currentShowId: '74',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('requestShow', () => {
    it('has a successful response', async () => {
      const expectedResponse = new ShowModel({});

      jest.spyOn(ShowsEffect, 'requestShow').mockImplementation(async () => expectedResponse);

      await store.dispatch(ShowsAction.requestShow());

      const actualResult = store.getActions();
      const expectedResult = [
        ActionUtility.createAction(ShowsAction.REQUEST_SHOW),
        ActionUtility.createAction(ShowsAction.REQUEST_SHOW_FINISHED, expectedResponse),
      ];

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('requestEpisodes', () => {
    it('has a successful response', async () => {
      const expectedResponse = [new EpisodeModel({})];

      jest.spyOn(ShowsEffect, 'requestEpisodes').mockImplementation(async () => expectedResponse);

      await store.dispatch(ShowsAction.requestEpisodes());

      const actualResult = store.getActions();
      const expectedResult = [
        ActionUtility.createAction(ShowsAction.REQUEST_EPISODES),
        ActionUtility.createAction(ShowsAction.REQUEST_EPISODES_FINISHED, expectedResponse),
      ];

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('requestCast', () => {
    it('has a successful response', async () => {
      const expectedResponse = [new CastModel({})];

      jest.spyOn(ShowsEffect, 'requestCast').mockImplementation(async () => expectedResponse);

      await store.dispatch(ShowsAction.requestCast());

      const actualResult = store.getActions();
      const expectedResult = [
        ActionUtility.createAction(ShowsAction.REQUEST_CAST),
        ActionUtility.createAction(ShowsAction.REQUEST_CAST_FINISHED, expectedResponse),
      ];

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
