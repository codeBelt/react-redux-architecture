import { createSelector } from 'reselect';
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

export class EpisodesSelector {
  static selectEpisodes(episodes) {
    const seasons = groupBy(episodes, 'season');

    return Object.entries(seasons).map(([season, models]) => {
      return {
        title: `Season ${season}`,
        rows: EpisodesSelector._createTableRows(models),
      };
    });
  }

  static _createTableRows(models) {
    return models.map((model) => ({
      episode: model.number,
      name: model.name,
      date: dayjs(model.airdate).format('MMM D, YYYY'),
      image: model.image.medium,
    }));
  }
}

export const selectEpisodes = createSelector(
  (state) => state.shows.episodes,
  EpisodesSelector.selectEpisodes
);
