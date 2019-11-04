import * as ShowsEffect from './ShowsEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

type ActionUnion = undefined | HttpErrorResponseModel | ShowModel | EpisodeModel[] | CastModel[];

export const REQUEST_SHOW: string = 'ShowsAction.REQUEST_SHOW';
export const REQUEST_SHOW_FINISHED: string = 'ShowsAction.REQUEST_SHOW_FINISHED';

export function requestShow(): any {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    const showId: string = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect<ShowModel>(dispatch, REQUEST_SHOW, ShowsEffect.requestShow, showId);
  };
}

export const REQUEST_EPISODES: string = 'ShowsAction.REQUEST_EPISODES';
export const REQUEST_EPISODES_FINISHED: string = 'ShowsAction.REQUEST_EPISODES_FINISHED';

export function requestEpisodes(): any {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    const showId: string = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect<EpisodeModel[]>(dispatch, REQUEST_EPISODES, ShowsEffect.requestEpisodes, showId);
  };
}

export const REQUEST_CAST: string = 'ShowsAction.REQUEST_CAST';
export const REQUEST_CAST_FINISHED: string = 'ShowsAction.REQUEST_CAST_FINISHED';

export function requestCast(): any {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    const showId: string = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect<CastModel[]>(dispatch, REQUEST_CAST, ShowsEffect.requestCast, showId);
  };
}

export const REQUEST_ERROR: string = 'ShowsAction.REQUEST_ERROR';
export const REQUEST_ERROR_FINISHED: string = 'ShowsAction.REQUEST_ERROR_FINISHED';

export function requestError(): any {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<any>(dispatch, REQUEST_ERROR, ShowsEffect.requestError);
  };
}
