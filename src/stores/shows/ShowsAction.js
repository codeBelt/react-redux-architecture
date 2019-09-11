import ShowsEffect from './ShowsEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class ShowsAction {
  static REQUEST_SHOW = 'ShowAction.REQUEST_SHOW';
  static REQUEST_SHOW_FINISHED = 'ShowAction.REQUEST_SHOW_FINISHED';

  static REQUEST_EPISODES = 'ShowAction.REQUEST_EPISODES';
  static REQUEST_EPISODES_FINISHED = 'ShowAction.REQUEST_EPISODES_FINISHED';

  static REQUEST_CAST = 'ShowAction.REQUEST_CAST';
  static REQUEST_CAST_FINISHED = 'ShowAction.REQUEST_CAST_FINISHED';

  static requestShow() {
    return async (dispatch, getState) => {
      const showId = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect(dispatch, ShowsAction.REQUEST_SHOW, ShowsEffect.requestShow, showId);
    };
  }

  static requestEpisodes() {
    return async (dispatch, getState) => {
      const showId = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect(dispatch, ShowsAction.REQUEST_EPISODES, ShowsEffect.requestEpisodes, showId);
    };
  }

  static requestCast() {
    return async (dispatch, getState) => {
      const showId = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect(dispatch, ShowsAction.REQUEST_CAST, ShowsEffect.requestCast, showId);
    };
  }
}
