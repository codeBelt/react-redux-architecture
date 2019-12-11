import { action, computed, observable } from 'mobx';
import CastModel from './models/cast/CastModel';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import environment from 'environment';
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
  @observable show: IRequestStatus<ShowModel | null> = initialRequestStatus(null);
  @observable episodes: IRequestStatus<EpisodeModel[]> = initialRequestStatus([]);
  @observable actors: IRequestStatus<CastModel[]> = initialRequestStatus([]);
  @observable errorExample: IRequestStatus<null> = initialRequestStatus(null);

  @action
  async requestShow(): Promise<void> {
    const endpoint = environment.api.shows.replace(':showId', this.currentShowId);

    await this.requestAction<ShowModel>(
      () => EffectUtility.getToModel<ShowModel[]>(ShowModel, endpoint),
      (status: IRequestStatus<ShowModel | null>) => (this.show = status)
    );
  }

  @action
  async requestEpisodes(): Promise<void> {
    const endpoint = environment.api.episodes.replace(':showId', this.currentShowId);

    await this.requestAction<EpisodeModel[]>(
      () => EffectUtility.getToModel<EpisodeModel[]>(EpisodeModel, endpoint),
      (status: IRequestStatus<EpisodeModel[]>) => (this.episodes = status)
    );
  }

  @action
  async requestCast(): Promise<void> {
    const endpoint = environment.api.cast.replace(':showId', this.currentShowId);

    await this.requestAction<CastModel[]>(
      () => EffectUtility.getToModel<CastModel[]>(CastModel, endpoint),
      (status: IRequestStatus<CastModel[]>) => (this.actors = status)
    );
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
  get isRequestingShowAndCast(): boolean {
    const { isRequesting: isRequestingCast } = this.actors!;
    const { isRequesting: isRequestingShow } = this.show!;

    return [isRequestingCast, isRequestingShow].some(Boolean);
  }

  @computed
  get selectEpisodes(): IEpisodeTable[] {
    const seasons: { [season: string]: EpisodeModel[] } = groupBy(this.episodes.data, 'season');

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
