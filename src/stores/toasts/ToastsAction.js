import * as ActionUtility from '../../utilities/ActionUtility';
import uuid from 'uuid/v4';

export const ADD_TOAST = 'ToastsAction.ADD_TOAST';

export function add(message, type) {
  return ActionUtility.createAction(ADD_TOAST, {
    message,
    type,
    id: uuid(),
  });
}

export const REMOVE_TOAST = 'ToastsAction.REMOVE_TOAST';

export function removeById(toastId) {
  return ActionUtility.createAction(REMOVE_TOAST, toastId);
}
