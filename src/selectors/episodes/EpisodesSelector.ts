import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import EpisodeModel from '../../stores/shows/models/episodes/EpisodeModel';
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';
import IEpisodeTable from './models/IEpisodeTable';
import IEpisodeTableRow from './models/IEpisodeTableRow';

const _selectEpisodes = (episodes: EpisodeModel[]): IEpisodeTable[] => {
  const seasons: { [season: string]: EpisodeModel[] } = groupBy(episodes, 'season');

  return Object.entries(seasons).map(
    ([season, models]: [string, EpisodeModel[]]): IEpisodeTable => {
      return {
        title: `Season ${season}`,
        rows: _createTableRows(models),
      };
    }
  );
};

const _createTableRows = (models: EpisodeModel[]): IEpisodeTableRow[] => {
  return models.map(
    (model: EpisodeModel): IEpisodeTableRow => ({
      episode: model.number,
      name: model.name,
      date: dayjs(model.airdate).format('MMM D, YYYY'),
      image: model.image.medium,
    })
  );
};

export const selectEpisodes: Selector<IStore, IEpisodeTable[]> = createSelector(
  (state: IStore) => state.shows.episodes,
  _selectEpisodes
);
