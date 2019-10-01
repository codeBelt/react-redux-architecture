import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';
import * as EffectUtility from '../../utilities/EffectUtility';

export async function requestShow(showId) {
  const endpoint = environment.api.shows.replace(':showId', showId);

  return EffectUtility.getToModel(ShowModel, endpoint);
}

export async function requestEpisodes(showId) {
  const endpoint = environment.api.episodes.replace(':showId', showId);

  return EffectUtility.getToModel(EpisodeModel, endpoint);
}

export async function requestCast(showId) {
  const endpoint = environment.api.cast.replace(':showId', showId);

  // Below is just to show you what the above "requestEpisodes" method is doing with "EffectUtility.getToModel".
  // In your application you can change this to match the "requestEpisodes" method.
  const response = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data.map((json) => new CastModel(json));
}

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export async function requestError() {
  const endpoint = environment.api.errorExample;
  const response = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
}
