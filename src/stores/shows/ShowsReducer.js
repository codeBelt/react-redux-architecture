import ShowsAction from './ShowsAction';

export default class ShowsReducer {
  static initialState = {
    currentShowId: '74',
    show: null,
    episodes: [],
    actors: [],
  };

  static reducer(state = ShowsReducer.initialState, action) {
    if (action.error) {
      return state;
    }

    switch (action.type) {
      case ShowsAction.REQUEST_SHOW_FINISHED:
        return {
          ...state,
          show: action.payload,
        };
      case ShowsAction.REQUEST_EPISODES_FINISHED:
        return {
          ...state,
          episodes: action.payload,
        };
      case ShowsAction.REQUEST_CAST_FINISHED:
        return {
          ...state,
          actors: action.payload,
        };
      default:
        return state;
    }
  }
}
