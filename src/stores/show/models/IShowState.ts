import ShowModel from './shows/ShowModel';
import EpisodeModel from './episodes/EpisodeModel';
import CastModel from './cast/CastModel';

export default interface IShowState {
  readonly currentShowId: string;
  readonly show: ShowModel | null;
  readonly episodes: EpisodeModel[];
  readonly actors: CastModel[];
}
