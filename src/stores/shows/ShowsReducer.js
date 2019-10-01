import * as ShowsAction from './ShowsAction';
import baseReducer from '../../utilities/BaseReducer';

export const initialState = {
  currentShowId: '74',
  show: null,
  episodes: [],
  actors: [],
};

const showsReducer = baseReducer(initialState, {
  [ShowsAction.REQUEST_SHOW_FINISHED](state, action) {
    return {
      ...state,
      show: action.payload,
    };
  },

  [ShowsAction.REQUEST_EPISODES_FINISHED](state, action) {
    return {
      ...state,
      episodes: action.payload,
    };
  },

  [ShowsAction.REQUEST_CAST_FINISHED](state, action) {
    return {
      ...state,
      actors: action.payload,
    };
  },
});

export default showsReducer;
