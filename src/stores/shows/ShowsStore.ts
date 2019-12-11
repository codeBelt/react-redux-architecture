import { action, computed, observable, runInAction } from 'mobx';
import CastModel from './models/cast/CastModel';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import EffectUtility from '../../utilities/EffectUtility';
import HttpUtility from '../../utilities/HttpUtility';
import groupBy from 'lodash.groupby';
import IEpisodeTable from './computed/IEpisodeTable';
import IEpisodeTableRow from './computed/IEpisodeTableRow';
import dayjs from 'dayjs';
import BaseStore from '../BaseStore';
import { initialRequestStatus, IRequestStatus } from '../../models/IRequestStatus';

export default class ShowsStore extends BaseStore {
  @observable currentShowId: string = '74';
  @observable show: IRequestStatus<ShowModel | null> = initialRequestStatus;
  @observable episodes: EpisodeModel[] = [];
  @observable actors: CastModel[] = [];
  @observable errorExample: IRequestStatus<null> = initialRequestStatus;

  @action
  async requestShow(): Promise<void> {
    const endpoint = environment.api.shows.replace(':showId', this.currentShowId);

    await this.requestAction<ShowModel>(
      () => EffectUtility.getToModel<ShowModel[]>(ShowModel, endpoint),
      (status) => (this.show = status)
    );
  }

  @action
  async requestEpisodes(): Promise<void> {
    const endpoint = environment.api.episodes.replace(':showId', this.currentShowId);
    const response = await EffectUtility.getToModel<EpisodeModel[]>(EpisodeModel, endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return;
    }

    runInAction(() => {
      this.episodes = response;
    });
  }

  @action
  async requestCast(): Promise<void> {
    const endpoint = environment.api.cast.replace(':showId', this.currentShowId);
    const response = await EffectUtility.getToModel<CastModel[]>(CastModel, endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return;
    }

    runInAction(() => {
      this.actors = response;
    });
  }

  /**
   * This is only to trigger an error api response so we can use it for an example in the AboutPage
   */
  @action
  async requestError(): Promise<void> {
    const endpoint = environment.api.errorExample;

    await this.requestAction<null>(
      () => HttpUtility.get(endpoint),
      (status) => (this.errorExample = status)
    );
  }

  @computed
  get selectEpisodes(): IEpisodeTable[] {
    const seasons: { [season: string]: EpisodeModel[] } = groupBy(this.episodes, 'season');

    return Object.entries(seasons).map(
      ([season, models]: [string, EpisodeModel[]]): IEpisodeTable => {
        return {
          title: `Season ${season}`,
          rows: this._createTableRows(models),
        };
      }
    );
  }

  private _createTableRows(models: EpisodeModel[]): IEpisodeTableRow[] {
    return models.map(
      (model: EpisodeModel): IEpisodeTableRow => ({
        episode: model.number,
        name: model.name,
        date: dayjs(model.airdate).format('MMM D, YYYY'),
        image: model.image.medium,
      })
    );
  }
}
