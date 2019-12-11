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

  async requestAction<T>(effect: () => Promise<any>, prop: (requestData: IRequestStatus<T>) => void) {
    const status: IRequestStatus<any> = {
      ...initialRequestStatus(null),
      isRequesting: true,
    };

    runInAction(() => prop(status));

    const response = await effect();

    if (response instanceof HttpErrorResponseModel) {
      status.error = response;

      this.rootStore.toastsStore.add(response.message, ToastStatusEnum.Error);
    } else {
      status.data = response;
    }

    status.isRequesting = false;

    runInAction(() => prop(status));
  }
}
