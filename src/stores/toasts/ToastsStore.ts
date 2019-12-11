import { action, observable } from 'mobx';
import IToast from './models/IToast';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import uuid from 'uuid/v4';
import BaseStore from '../BaseStore';

export default class ToastsStore extends BaseStore {
  @observable items: IToast[] = [];

  @action
  add(message: string, type: ToastStatusEnum): void {
    const item: IToast = {
      message,
      type,
      id: uuid(),
    };

    this.items.push(item);
  }

  @action
  remove(toastId: string): void {
    this.items = this.items.filter((model: IToast) => model.id !== toastId);
  }
}
