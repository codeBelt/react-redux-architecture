import HttpUtility from './HttpUtility';
import { AxiosResponse } from 'axios';
import { IConstructor } from '../models/IConstructor';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';

export default class EffectUtility {
  private static _http = new HttpUtility();

  public static async get<T>(endpoint: string, Model?: IConstructor<T>, params?: any): Promise<T | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await EffectUtility._http.get(endpoint, params);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return Model ? new Model(response.data) : response.data;
  }

  public static async post<T>(endpoint: string, data?: any, Model?: IConstructor<T>): Promise<T | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await EffectUtility._http.post(endpoint, data);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return Model ? new Model(response.data) : response.data;
  }
}
