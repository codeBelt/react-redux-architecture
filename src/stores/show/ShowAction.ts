import ShowResponseModel from './models/show/ShowResponseModel';
import ShowEffect from './ShowEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import IAction from '../../models/IAction';
import IStore from '../../models/IStore';
import { ReduxDispatch } from '../../models/ReduxProps';

export type ShowActionUnion = void | HttpErrorResponseModel | ShowResponseModel;

export default class ShowAction {
  public static readonly REQUEST_SHOW: string = 'ShowAction.REQUEST_SHOW';
  public static readonly REQUEST_SHOW_FINISHED: string = 'ShowAction.REQUEST_SHOW_FINISHED';

  public static readonly REQUEST_EPISODES: string = 'ShowAction.REQUEST_EPISODES';
  public static readonly REQUEST_EPISODES_FINISHED: string = 'ShowAction.REQUEST_EPISODES_FINISHED';

  public static readonly REQUEST_CAST: string = 'ShowAction.REQUEST_CAST';
  public static readonly REQUEST_CAST_FINISHED: string = 'ShowAction.REQUEST_CAST_FINISHED';

  public static requestShow(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      dispatch({ type: ShowAction.REQUEST_SHOW });

      const model: ShowResponseModel | HttpErrorResponseModel = await ShowEffect.requestShow();

      dispatch(ShowAction.requestShowFinished(model));
    };
  }

  public static requestShowFinished(model: ShowResponseModel | HttpErrorResponseModel): IAction<ShowResponseModel | HttpErrorResponseModel> {
    return {
      type: ShowAction.REQUEST_SHOW_FINISHED,
      payload: model,
      error: model instanceof HttpErrorResponseModel,
    };
  }

  public static requestEpisodes(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      dispatch({ type: ShowAction.REQUEST_EPISODES });

      const model: ShowResponseModel | HttpErrorResponseModel = await ShowEffect.requestEpisodes();

      dispatch(ShowAction.requestEpisodesFinished(model));
    };
  }

  public static requestEpisodesFinished(model: ShowResponseModel | HttpErrorResponseModel): IAction<ShowResponseModel | HttpErrorResponseModel> {
    return {
      type: ShowAction.REQUEST_EPISODES_FINISHED,
      payload: model,
      error: model instanceof HttpErrorResponseModel,
    };
  }

  public static requestCast(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      dispatch({ type: ShowAction.REQUEST_CAST });

      const model: ShowResponseModel | HttpErrorResponseModel = await ShowEffect.requestCast();

      dispatch(ShowAction.requestCastFinished(model));
    };
  }

  public static requestCastFinished(model: ShowResponseModel | HttpErrorResponseModel): IAction<ShowResponseModel | HttpErrorResponseModel> {
    return {
      type: ShowAction.REQUEST_CAST_FINISHED,
      payload: model,
      error: model instanceof HttpErrorResponseModel,
    };
  }
}
