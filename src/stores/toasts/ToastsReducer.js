import ToastsAction from './ToastsAction';
import BaseReducer from '../../utilities/BaseReducer';

export default class ToastsReducer extends BaseReducer {
  initialState = {
    items: [],
  };

  [ToastsAction.ADD_TOAST](state, action) {
    return {
      ...state,
      items: [...state.items, action.payload],
    };
  }

  [ToastsAction.REMOVE_TOAST](state, action) {
    const toastId = action.payload;

    return {
      ...state,
      items: state.items.filter((model) => model.id !== toastId),
    };
  }
}
