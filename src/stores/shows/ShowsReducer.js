import ShowsAction from './ShowsAction';
import BaseReducer from '../../utilities/BaseReducer';

export default class ShowsReducer extends BaseReducer {
  initialState = {
    currentShowId: '74',
    show: null,
    episodes: [],
    actors: [],
  };

  [ShowsAction.REQUEST_SHOW_FINISHED](state, action) {
    return {
      ...state,
      show: action.payload,
    };
  }

  [ShowsAction.REQUEST_EPISODES_FINISHED](state, action) {
    return {
      ...state,
      episodes: action.payload,
    };
  }

  [ShowsAction.REQUEST_CAST_FINISHED](state, action) {
    return {
      ...state,
      actors: action.payload,
    };
  }
}
