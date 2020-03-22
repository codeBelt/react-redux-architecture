import ShowsEffect from './ShowsEffect';
import nock from 'nock';
import axios from 'axios';
import environment from 'environment';
import ShowModel from './models/shows/ShowModel';
import StringUtil from '../../utilities/StringUtil';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('ShowsEffect', () => {
  describe('requestShow', () => {
    it('has a successful response', async () => {
      const showId = '74';
      const endpoint = environment.api.shows.replace(':showId', showId);
      const [baseUrl, sourceUrl] = StringUtil.splitBySeparator(endpoint, '.com');

      const scope = nock(baseUrl)
        .get(sourceUrl)
        .reply(200, { name: 'Robert' });

      const actualResult = await ShowsEffect.requestShow(showId);

      expect(actualResult).toBeInstanceOf(ShowModel);
      expect(actualResult.name).toEqual('Robert');

      // Assert that the expected request was made.
      scope.done();
    });
  });

  describe('requestEpisodes', () => {
    it('has a successful response', async () => {
      const showId = '74';
      const endpoint = environment.api.episodes.replace(':showId', showId);
      const [baseUrl, sourceUrl] = StringUtil.splitBySeparator(endpoint, '.com');

      const scope = nock(baseUrl)
        .get(sourceUrl)
        .reply(200, [{ summary: 'Robert is cool' }]);

      const actualResult = await ShowsEffect.requestEpisodes(showId);

      expect(actualResult[0]).toBeInstanceOf(EpisodeModel);
      expect(actualResult[0].summary).toEqual('Robert is cool');

      // Assert that the expected request was made.
      scope.done();
    });
  });

  describe('requestCast', () => {
    it('has a successful response', async () => {
      const showId = '74';
      const endpoint = environment.api.cast.replace(':showId', showId);
      const [baseUrl, sourceUrl] = StringUtil.splitBySeparator(endpoint, '.com');

      const scope = nock(baseUrl)
        .get(sourceUrl)
        .reply(200, [{ self: true }]);

      const actualResult = await ShowsEffect.requestCast(showId);

      expect(actualResult[0]).toBeInstanceOf(CastModel);
      expect(actualResult[0].self).toBe(true);

      // Assert that the expected request was made.
      scope.done();
    });
  });
});
