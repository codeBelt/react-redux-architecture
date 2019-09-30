import { IConstructor } from '../models/IConstructor';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { AxiosResponse } from 'axios';
import * as HttpUtility from './HttpUtility';

type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
type SingleItemOrArray<T> = T extends [] ? T[] : T;

export const getToModel = async <T>(
  Model: IConstructor<FlattenIfArray<T>>,
  endpoint: string,
  params?: any
): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> => {
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint, params);

  return _restModelCreator<T>(Model, response);
};

export const postToModel = async <T>(
  Model: IConstructor<FlattenIfArray<T>>,
  endpoint: string,
  data?: any
): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> => {
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.post(endpoint, data);

  return _restModelCreator<T>(Model, response);
};

const _restModelCreator = <T>(
  Model: IConstructor<FlattenIfArray<T>>,
  response: AxiosResponse | HttpErrorResponseModel
): SingleItemOrArray<T> | HttpErrorResponseModel => {
  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return !Array.isArray(response.data) ? new Model(response.data) : (response.data.map((json) => new Model(json)) as any);
};
