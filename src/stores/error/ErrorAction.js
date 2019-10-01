import * as ActionUtility from '../../utilities/ActionUtility';

export const REMOVE = 'ErrorAction.REMOVE';

export function removeById(id) {
  return ActionUtility.createAction(REMOVE, id);
}

export const CLEAR_ALL = 'ErrorAction.CLEAR_ALL';

export function clearAll() {
  return ActionUtility.createAction(CLEAR_ALL);
}
