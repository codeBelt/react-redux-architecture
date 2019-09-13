import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';
import { AxiosResponse } from 'axios';
import EffectUtility from '../../utilities/EffectUtility';

export default class ShowsEffect {
  public static async requestShow(showId: string): Promise<ShowModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.shows.replace('{showId}', showId);

    return EffectUtility.getToModel<ShowModel>(ShowModel, endpoint);
  }

  public static async requestEpisodes(showId: string): Promise<EpisodeModel[] | HttpErrorResponseModel> {
    const endpoint: string = environment.api.episodes.replace('{showId}', showId);

    return EffectUtility.getToModel<EpisodeModel[]>(EpisodeModel, endpoint);
  }

  public static async requestCast(showId: string): Promise<CastModel[] | HttpErrorResponseModel> {
    const endpoint: string = environment.api.cast.replace('{showId}', showId);

    // Below is just to show you what the above "requestEpisodes" method is doing with "EffectUtility.getToModel".
    // In your application you can change this to match the "requestEpisodes" method.
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data.map((json: Partial<CastModel>) => new CastModel(json));
  }
}
