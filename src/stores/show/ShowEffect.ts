import { AxiosResponse } from 'axios';
import environment from 'environment';
import ShowResponseModel from './models/show/ShowResponseModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class ShowEffect {
  private static _http = new HttpUtility();
  private static _showId: string = '74';

  public static async requestShow(): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.shows.replace('{showId}', ShowEffect._showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }

  public static async requestEpisodes(): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.episodes.replace('{showId}', ShowEffect._showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }

  public static async requestCast(): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.cast.replace('{showId}', ShowEffect._showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }
}
