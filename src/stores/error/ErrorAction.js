import ActionUtility from '../../utilities/ActionUtility';

export default class ErrorAction {
  static CLEAR_ALL = 'ErrorAction.CLEAR_ALL';
  static REMOVE = 'ErrorAction.REMOVE';

  static removeById(id) {
    return ActionUtility.createAction(ErrorAction.REMOVE, id);
  }

  static clearAll() {
    return ActionUtility.createAction(ErrorAction.CLEAR_ALL);
  }
}
