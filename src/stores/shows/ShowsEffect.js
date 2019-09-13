import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';
import EffectUtility from '../../utilities/EffectUtility';

export default class ShowsEffect {
  static async requestShow(showId) {
    const endpoint = environment.api.shows.replace(':showId', showId);

    return EffectUtility.getToModel(ShowModel, endpoint);
  }

  static async requestEpisodes(showId) {
    const endpoint = environment.api.episodes.replace(':showId', showId);

    return EffectUtility.getToModel(EpisodeModel, endpoint);
  }

  static async requestCast(showId) {
    const endpoint = environment.api.cast.replace(':showId', showId);

    // Below is just to show you what the above "requestEpisodes" method is doing with "HttpUtility.getToModel".
    // In your application you can change this to match the "requestEpisodes" method.
    const response = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data.map((json) => new CastModel(json));
  }
}
