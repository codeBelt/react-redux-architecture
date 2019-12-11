import { RootStore } from './rootStore';
import { runInAction } from 'mobx';
import HttpUtility from '../utilities/HttpUtility';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { initialRequestStatus, IRequestStatus } from '../models/IRequestStatus';

export default class BaseStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async setRequestAction<P>(endpoint: string, prop: (requestData: IRequestStatus<P>) => void) {
    const status = {
      ...initialRequestStatus,
      isLoading: true,
    };

    runInAction(() => prop(status));

    const response = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      status.error = response;
    } else {
      status.data = response.data;
    }

    status.isLoading = false;

    runInAction(() => prop(status));
  }
}
