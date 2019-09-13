import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import HttpUtility from './HttpUtility';

export default class EffectUtility {
  static async getToModel(Model, endpoint, params) {
    const response = await HttpUtility.get(endpoint, params);

    return EffectUtility._restModelCreator(Model, response);
  }

  static async postToModel(Model, endpoint, data) {
    const response = await HttpUtility.post(endpoint, data);

    return EffectUtility._restModelCreator(Model, response);
  }

  static _restModelCreator(Model, response) {
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return !Array.isArray(response.data) ? new Model(response.data) : response.data.map((json) => new Model(json));
  }
}
