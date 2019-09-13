import { IConstructor } from '../models/IConstructor';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { AxiosResponse } from 'axios';
import HttpUtility from './HttpUtility';

type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
type SingleItemOrArray<T> = T extends [] ? T[] : T;

export default class EffectUtility {
  public static async getToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    params?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint, params);

    return EffectUtility._restModelCreator<T>(Model, response);
  }

  public static async postToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    data?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.post(endpoint, data);

    return EffectUtility._restModelCreator<T>(Model, response);
  }

  private static _restModelCreator<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    response: AxiosResponse | HttpErrorResponseModel
  ): SingleItemOrArray<T> | HttpErrorResponseModel {
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return !Array.isArray(response.data) ? new Model(response.data) : (response.data.map((json) => new Model(json)) as any);
  }
}
