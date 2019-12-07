import { RootStore } from '../rootStore';
import { action, observable } from 'mobx';
import IToast from './models/IToast';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import uuid from 'uuid/v4';

export default class ToastsStore {
  @observable items: IToast[] = [];

  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  @action
  add(message: string, type: ToastStatusEnum): void {
    const item: IToast = {
      message,
      type,
      id: uuid(),
    };

    this.items = [...this.items, item];
  }

  @action
  remove(toastId: string): void {
    this.items = this.items.filter((model: IToast) => model.id !== toastId);
  }
}
