import * as ActionUtility from '../../utilities/ActionUtility';
import IAction from '../../models/IAction';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import IToast from './models/IToast';
import uuid from 'uuid/v4';

export const ADD_TOAST: string = 'ToastsAction.ADD_TOAST';

export const add = (message: string, type: ToastStatusEnum): IAction<IToast> => {
  return ActionUtility.createAction(ADD_TOAST, {
    message,
    type,
    id: uuid(),
  });
};

export const REMOVE_TOAST: string = 'ToastsAction.REMOVE_TOAST';

export const removeById = (toastId: string): IAction<string> => {
  return ActionUtility.createAction(REMOVE_TOAST, toastId);
};
