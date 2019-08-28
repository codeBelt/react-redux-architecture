import { AxiosResponse } from 'axios';
import environment from 'environment';
import ShowResponseModel from './models/show/ShowResponseModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class ShowEffect {
  private static _http = new HttpUtility();

  public static async requestShow(showId: string): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.shows.replace('{showId}', showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }

  public static async requestEpisodes(showId: string): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.episodes.replace('{showId}', showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }

  public static async requestCast(showId: string): Promise<ShowResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.cast.replace('{showId}', showId);
    const response: AxiosResponse | HttpErrorResponseModel = await ShowEffect._http.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
    // return new ShowResponseModel(response.data);
  }
}
