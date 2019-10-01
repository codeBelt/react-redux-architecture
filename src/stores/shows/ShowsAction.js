import * as ShowsEffect from './ShowsEffect';
import * as ActionUtility from '../../utilities/ActionUtility';

export const REQUEST_SHOW = 'ShowsAction.REQUEST_SHOW';
export const REQUEST_SHOW_FINISHED = 'ShowsAction.REQUEST_SHOW_FINISHED';

export function requestShow() {
  return async (dispatch, getState) => {
    const showId = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect(dispatch, REQUEST_SHOW, ShowsEffect.requestShow, showId);
  };
}

export const REQUEST_EPISODES = 'ShowsAction.REQUEST_EPISODES';
export const REQUEST_EPISODES_FINISHED = 'ShowsAction.REQUEST_EPISODES_FINISHED';

export function requestEpisodes() {
  return async (dispatch, getState) => {
    const showId = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect(dispatch, REQUEST_EPISODES, ShowsEffect.requestEpisodes, showId);
  };
}

export const REQUEST_CAST = 'ShowsAction.REQUEST_CAST';
export const REQUEST_CAST_FINISHED = 'ShowsAction.REQUEST_CAST_FINISHED';

export function requestCast() {
  return async (dispatch, getState) => {
    const showId = getState().shows.currentShowId;

    await ActionUtility.createThunkEffect(dispatch, REQUEST_CAST, ShowsEffect.requestCast, showId);
  };
}

export const REQUEST_ERROR = 'ShowsAction.REQUEST_ERROR';
export const REQUEST_ERROR_FINISHED = 'ShowsAction.REQUEST_ERROR_FINISHED';

export function requestError() {
  return async (dispatch, getState) => {
    await ActionUtility.createThunkEffect(dispatch, REQUEST_ERROR, ShowsEffect.requestError);
  };
}
