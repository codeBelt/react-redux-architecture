import axios from 'axios';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { oc } from 'ts-optchain';

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH',
};

export async function get(endpoint, params, requestConfig) {
  const paramsConfig = params ? { params } : undefined;

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

export async function post(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    config
  );
}

export async function put(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config
  );
}

export async function del(endpoint) {
  return _request({
    url: endpoint,
    method: RequestMethod.Delete,
  });
}

export async function _request(restRequest, config) {
  if (!Boolean(restRequest.url)) {
    console.error(`Received ${restRequest.url} which is invalid for a endpoint url`);
  }

  try {
    const axiosRequestConfig = {
      ...config,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...oc(config).headers(undefined),
      },
    };
    const axiosResponse = await axios(axiosRequestConfig);

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
      const errors = data.hasOwnProperty('errors') ? [statusText, ...data.errors] : [statusText];

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
        url: restRequest.url,
        raw: error,
      },
      restRequest
    );
  }
}

function _fillInErrorWithDefaults(error, request) {
  const model = new HttpErrorResponseModel();

  model.status = error.status || 0;
  model.message = error.message || 'Error requesting data';
  model.errors = error.errors.length ? error.errors : ['Error requesting data'];
  model.url = error.url || request.url;
  model.raw = error.raw;

  // Remove anything with undefined or empty strings.
  model.errors = model.errors.filter(Boolean);

  return model;
}
