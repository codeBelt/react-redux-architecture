import ActionUtility from '../../utilities/ActionUtility';
import IAction from '../../models/IAction';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import IToast from './models/IToast';
import uuid from 'uuid/v4';

export default class ToastsAction {
  public static readonly ADD_TOAST: string = 'ToastsAction.ADD_TOAST';
  public static readonly REMOVE_TOAST: string = 'ToastsAction.REMOVE_TOAST';

  public static addToast(message: string, type: ToastStatusEnum): IAction<IToast> {
    return ActionUtility.createAction(ToastsAction.ADD_TOAST, {
      message,
      type,
      id: uuid(),
    });
  }

  public static removeToast(toastId: string): IAction<string> {
    return ActionUtility.createAction(ToastsAction.REMOVE_TOAST, toastId);
  }
}
