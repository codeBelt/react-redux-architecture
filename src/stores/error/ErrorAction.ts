import IAction from '../../models/IAction';
import ActionUtility from '../../utilities/ActionUtility';

export default class ErrorAction {
  public static readonly CLEAR_ALL: string = 'ErrorAction.CLEAR_ALL';
  public static readonly REMOVE: string = 'ErrorAction.REMOVE';

  public static removeById(id: string): IAction<string> {
    return ActionUtility.createAction(ErrorAction.REMOVE, id);
  }

  public static clearAll(): IAction<undefined> {
    return ActionUtility.createAction(ErrorAction.CLEAR_ALL);
  }
}
