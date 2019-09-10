import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { oc } from 'ts-optchain';
import { IConstructor } from '../models/IConstructor';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
type SingleItemOrArray<T> = T extends [] ? T[] : T;

export default class HttpUtility {
  private constructor() {}

  public static async get(endpoint: string, params?: any, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
    const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

    return this._request(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      }
    );
  }

  public static async post(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return this._request(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config
    );
  }

  public static async put(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return this._request(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config
    );
  }

  public static async delete(endpoint: string): Promise<AxiosResponse | HttpErrorResponseModel> {
    return this._request({
      url: endpoint,
      method: RequestMethod.Delete,
    });
  }

  public static async getToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    params?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await this.get(endpoint, params);

    return this._restModelCreator<T>(Model, response);
  }

  public static async postToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    data?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await this.post(endpoint, data);

    return this._restModelCreator<T>(Model, response);
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

  private static async _request(restRequest: Partial<Request>, config?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
    if (!Boolean(restRequest.url)) {
      console.error(`Received ${restRequest.url} which is invalid for a endpoint url`);
    }

    try {
      const axiosRequestConfig: AxiosRequestConfig = {
        ...config,
        method: restRequest.method as Method,
        url: restRequest.url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...oc(config).headers(undefined),
        },
      };
      const axiosResponse: AxiosResponse = await axios(axiosRequestConfig);

      const { status, data, request } = axiosResponse;

      if (data.success === false) {
        return this._fillInErrorWithDefaults(
          {
            status,
            message: data.errors.join(' - '),
            errors: data.errors,
            url: request ? request.responseURL : restRequest.url,
            raw: axiosResponse,
          },
          restRequest
        );
      }

      return {
        ...axiosResponse,
      };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText, data } = error.response;
        const errors: string[] = data.hasOwnProperty('errors') ? [statusText, ...data.errors] : [statusText];

        return this._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(' - '),
            errors,
            url: error.request.responseURL,
            raw: error.response,
          },
          restRequest
        );
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        const { status, statusText, responseURL } = error.request;

        return this._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request,
          },
          restRequest
        );
      }

      // Something happened in setting up the request that triggered an Error
      return this._fillInErrorWithDefaults(
        {
          status: 0,
          message: error.message,
          errors: [error.message],
          url: restRequest.url!,
          raw: error,
        },
        restRequest
      );
    }
  }

  private static _fillInErrorWithDefaults(error: Partial<HttpErrorResponseModel>, request: Partial<Request>): HttpErrorResponseModel {
    const model = new HttpErrorResponseModel();

    model.status = error.status || 0;
    model.message = error.message || 'Error requesting data';
    model.errors = error.errors!.length ? error.errors! : ['Error requesting data'];
    model.url = error.url || request.url!;
    model.raw = error.raw;

    // Remove anything with undefined or empty strings.
    model.errors = model.errors.filter(Boolean);

    return model;
  }
}
