import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import EpisodeModel from '../../stores/show/models/episodes/EpisodeModel';
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

export class EpisodesSelector {
  public static getEpisodes(episodes: EpisodeModel[]): EpisodeModel[] {
    const seasons: { [season: string]: EpisodeModel[] } = groupBy(episodes, 'season');

    const tables = Object.entries(seasons).map(([season, models]: [string, EpisodeModel[]]) => {
      return {
        title: `Season ${season}`,
        rows: EpisodesSelector._createTableRows(models),
      };
    });

    console.log(`tables`, tables);

    return episodes;
  }

  private static _createTableRows(models: EpisodeModel[]) {
    return models.map((model: EpisodeModel) => ({
      episodes: model.number,
      name: model.number,
      date: dayjs(model.airdate).format('MMM D, YYYY'),
    }));
  }
}

export const getEpisodes: Selector<IStore, EpisodeModel[]> = createSelector(
  (state: IStore) => state.show.episodes,
  EpisodesSelector.getEpisodes
);
