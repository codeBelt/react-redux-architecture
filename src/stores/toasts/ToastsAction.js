import ActionUtility from '../../utilities/ActionUtility';
import uuid from 'uuid/v4';

export default class ToastsAction {
  static ADD_TOAST = 'ToastsAction.ADD_TOAST';
  static REMOVE_TOAST = 'ToastsAction.REMOVE_TOAST';

  static add(message, type) {
    return ActionUtility.createAction(ToastsAction.ADD_TOAST, {
      message,
      type,
      id: uuid(),
    });
  }

  static removeById(toastId) {
    return ActionUtility.createAction(ToastsAction.REMOVE_TOAST, toastId);
  }
}
