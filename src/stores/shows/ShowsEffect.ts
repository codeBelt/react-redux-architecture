import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';

export const requestShow = async (showId: string): Promise<ShowModel | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.shows.replace(':showId', showId);

  return EffectUtility.getToModel<ShowModel>(ShowModel, endpoint);
};

export const requestEpisodes = async (showId: string): Promise<EpisodeModel[] | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.episodes.replace(':showId', showId);

  return EffectUtility.getToModel<EpisodeModel[]>(EpisodeModel, endpoint);
};

export const requestCast = async (showId: string): Promise<CastModel[] | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.cast.replace(':showId', showId);

  // Below is just to show you what the above "requestEpisodes" method is doing with "EffectUtility.getToModel".
  // In your application you can change this to match the "requestEpisodes" method.
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data.map((json: Partial<CastModel>) => new CastModel(json));
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.errorExample;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
