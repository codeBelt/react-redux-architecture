import ShowsEffect from './ShowsEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class ShowsAction {
  static REQUEST_SHOW = 'ShowsAction.REQUEST_SHOW';
  static REQUEST_SHOW_FINISHED = 'ShowsAction.REQUEST_SHOW_FINISHED';

  static REQUEST_EPISODES = 'ShowsAction.REQUEST_EPISODES';
  static REQUEST_EPISODES_FINISHED = 'ShowsAction.REQUEST_EPISODES_FINISHED';

  static REQUEST_CAST = 'ShowsAction.REQUEST_CAST';
  static REQUEST_CAST_FINISHED = 'ShowsAction.REQUEST_CAST_FINISHED';

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
