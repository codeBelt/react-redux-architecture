import * as ToastsAction from './ToastsAction';
import baseReducer from '../../utilities/BaseReducer';

export const initialState = {
  items: [],
};

const toastsReducer = baseReducer(initialState, {
  [ToastsAction.ADD_TOAST](state, action) {
    return {
      ...state,
      items: [...state.items, action.payload],
    };
  },

  [ToastsAction.REMOVE_TOAST](state, action) {
    const toastId = action.payload;

    return {
      ...state,
      items: state.items.filter((model) => model.id !== toastId),
    };
  },
});

export default toastsReducer;
