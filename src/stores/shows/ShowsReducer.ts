import IShowsState from './models/IShowsState';
import * as ShowsAction from './ShowsAction';
import IAction from '../../models/IAction';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IShowsState = {
  currentShowId: '74',
  show: null,
  episodes: [],
  actors: [],
};

const showsReducer: Reducer = baseReducer(initialState, {
  [ShowsAction.REQUEST_SHOW_FINISHED](state: IShowsState, action: IAction<ShowModel>): IShowsState {
    return {
      ...state,
      show: action.payload!,
    };
  },

  [ShowsAction.REQUEST_EPISODES_FINISHED](state: IShowsState, action: IAction<EpisodeModel[]>): IShowsState {
    return {
      ...state,
      episodes: action.payload!,
    };
  },

  [ShowsAction.REQUEST_CAST_FINISHED](state: IShowsState, action: IAction<CastModel[]>): IShowsState {
    return {
      ...state,
      actors: action.payload!,
    };
  },
});

export default showsReducer;
