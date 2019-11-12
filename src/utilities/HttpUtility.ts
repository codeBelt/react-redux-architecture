import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

export async function get(endpoint: string, params?: any, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
  const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

  return _request(
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

export async function post(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
  const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    config
  );
}

export async function put(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
  const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config
  );
}

export async function del(endpoint: string): Promise<AxiosResponse | HttpErrorResponseModel> {
  return _request({
    url: endpoint,
    method: RequestMethod.Delete,
  });
}

export async function _request(restRequest: Partial<Request>, config?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
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
        ...config?.headers,
      },
    };
    const [axiosResponse] = await Promise.all([axios(axiosRequestConfig), _delay()]);

    const { status, data, request } = axiosResponse;

    if (data.success === false) {
      return _fillInErrorWithDefaults(
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

      return _fillInErrorWithDefaults(
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

      return _fillInErrorWithDefaults(
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
    return _fillInErrorWithDefaults(
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

function _fillInErrorWithDefaults(error: Partial<HttpErrorResponseModel>, request: Partial<Request>): HttpErrorResponseModel {
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

/**
 * We want to show the loading indicator to the user but sometimes the api
 * request finished too quickly. This makes sure there the loading indicator is
 * visual for at least a given time.
 *
 * @param duration
 * @returns {Promise<void>}
 * @private
 */
function _delay(duration: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
