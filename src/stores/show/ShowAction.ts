import ShowEffect from './ShowEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ActionUtility from '../../utilities/ActionUtility';
import ShowModel from './models/ShowModel';
import EpisodeModel from './models/EpisodeModel';
import CastModel from './models/CastModel';

export type ShowActionUnion = HttpErrorResponseModel | ShowModel | EpisodeModel[] | CastModel[];

export default class ShowAction {
  public static readonly REQUEST_SHOW: string = 'ShowAction.REQUEST_SHOW';
  public static readonly REQUEST_SHOW_FINISHED: string = 'ShowAction.REQUEST_SHOW_FINISHED';

  public static readonly REQUEST_EPISODES: string = 'ShowAction.REQUEST_EPISODES';
  public static readonly REQUEST_EPISODES_FINISHED: string = 'ShowAction.REQUEST_EPISODES_FINISHED';

  public static readonly REQUEST_CAST: string = 'ShowAction.REQUEST_CAST';
  public static readonly REQUEST_CAST_FINISHED: string = 'ShowAction.REQUEST_CAST_FINISHED';

  public static requestShow(showId: string): any {
    return ActionUtility.createThunkEffect<ShowModel>(ShowAction.REQUEST_SHOW, ShowEffect.requestShow, showId);
  }

  public static requestEpisodes(showId: string): any {
    return ActionUtility.createThunkEffect<EpisodeModel>(ShowAction.REQUEST_EPISODES, ShowEffect.requestEpisodes, showId);
  }

  public static requestCast(showId: string): any {
    return ActionUtility.createThunkEffect<CastModel>(ShowAction.REQUEST_CAST, ShowEffect.requestCast, showId);
  }
}
