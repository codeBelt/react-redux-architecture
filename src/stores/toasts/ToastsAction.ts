import ActionUtility from '../../utilities/ActionUtility';
import IAction from '../../models/IAction';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import IToast from './models/IToast';
import { v4 as uuidv4 } from 'uuid';

export default class ToastsAction {
  public static readonly ADD_TOAST: string = 'ToastsAction.ADD_TOAST';
  public static readonly REMOVE_TOAST: string = 'ToastsAction.REMOVE_TOAST';

  public static add(message: string, type: ToastStatusEnum): IAction<IToast> {
    return ActionUtility.createAction(ToastsAction.ADD_TOAST, {
      message,
      type,
      id: uuidv4(),
    });
  }

  public static removeById(toastId: string): IAction<string> {
    return ActionUtility.createAction(ToastsAction.REMOVE_TOAST, toastId);
  }
}
