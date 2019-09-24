import IToastsState from './models/IToastsState';
import ToastsAction from './ToastsAction';
import BaseReducer from '../../utilities/BaseReducer';
import IAction from '../../models/IAction';
import IToast from './models/IToast';

export default class ToastsReducer extends BaseReducer<IToastsState> {
  public readonly initialState: IToastsState = {
    items: [],
  };

  public [ToastsAction.ADD_TOAST](state: IToastsState, action: IAction<IToast>): IToastsState {
    return {
      ...state,
      items: [...state.items, action.payload!],
    };
  }

  public [ToastsAction.REMOVE_TOAST](state: IToastsState, action: IAction<string>): IToastsState {
    const toastId: string = action.payload!;

    return {
      ...state,
      items: state.items.filter((model: IToast) => model.id !== toastId),
    };
  }
}
