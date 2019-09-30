import IToastsState from './models/IToastsState';
import * as ToastsAction from './ToastsAction';
import IAction from '../../models/IAction';
import IToast from './models/IToast';
import baseReducer from '../../utilities/BaseReducer';

const initialState: IToastsState = {
  items: [],
};

const toastsReducer = baseReducer(initialState, {
  [ToastsAction.ADD_TOAST](state: IToastsState, action: IAction<IToast>): IToastsState {
    return {
      ...state,
      items: [...state.items, action.payload!],
    };
  },

  [ToastsAction.REMOVE_TOAST](state: IToastsState, action: IAction<string>): IToastsState {
    const toastId: string = action.payload!;

    return {
      ...state,
      items: state.items.filter((model: IToast) => model.id !== toastId),
    };
  },
});

export default toastsReducer;
