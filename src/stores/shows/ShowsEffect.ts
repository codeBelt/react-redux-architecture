import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

export default class ShowsEffect {
  private static _http = new HttpUtility();

  public static async requestShow(showId: string): Promise<ShowModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.shows.replace('{showId}', showId);

    return ShowsEffect._http.getToModel<any>(ShowModel, endpoint);
  }

  public static async requestEpisodes(showId: string): Promise<EpisodeModel[] | HttpErrorResponseModel> {
    const endpoint: string = environment.api.episodes.replace('{showId}', showId);

    return ShowsEffect._http.getToModel<any>(EpisodeModel, endpoint);
  }

  public static async requestCast(showId: string): Promise<CastModel[] | HttpErrorResponseModel> {
    const endpoint: string = environment.api.cast.replace('{showId}', showId);

    return ShowsEffect._http.getToModel<any>(CastModel, endpoint);
  }
}
