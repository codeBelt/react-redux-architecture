import IShowsState from './models/IShowsState';
import ShowsAction, { ShowActionUnion } from './ShowsAction';
import IAction from '../../models/IAction';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

export default class ShowsReducer {
  public static readonly initialState: IShowsState = {
    currentShowId: '74',
    show: null,
    episodes: [],
    actors: [],
  };

  public static reducer(state: IShowsState = ShowsReducer.initialState, action: IAction<ShowActionUnion>): IShowsState {
    if (action.error) {
      return state;
    }

    switch (action.type) {
      case ShowsAction.REQUEST_SHOW_FINISHED:
        return {
          ...state,
          show: action.payload as ShowModel,
        };
      case ShowsAction.REQUEST_EPISODES_FINISHED:
        return {
          ...state,
          episodes: action.payload as EpisodeModel[],
        };
      case ShowsAction.REQUEST_CAST_FINISHED:
        return {
          ...state,
          actors: action.payload as CastModel[],
        };
      default:
        return state;
    }
  }
}
