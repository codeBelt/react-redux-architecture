import { RootStore } from './rootStore';
import { runInAction } from 'mobx';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { initialRequestStatus, IRequestStatus } from '../models/IRequestStatus';
import ToastStatusEnum from '../constants/ToastStatusEnum';

export default class BaseStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async requestAction<P>(effect: () => Promise<any>, prop: (requestData: IRequestStatus<P>) => void) {
    const status = {
      ...initialRequestStatus,
      isLoading: true,
    };

    runInAction(() => prop(status));

    const response = await effect();

    if (response instanceof HttpErrorResponseModel) {
      status.error = response;

      this.rootStore.toastsStore.add(response.message, ToastStatusEnum.Error);
    } else {
      status.data = response;
    }

    status.isLoading = false;

    runInAction(() => prop(status));
  }
}
