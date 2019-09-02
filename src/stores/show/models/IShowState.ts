import ShowModel from './ShowModel';
import EpisodeModel from './EpisodeModel';
import CastModel from './CastModel';

export default interface IShowState {
  readonly currentShowId: string;
  readonly show: ShowModel | null;
  readonly episodes: EpisodeModel[];
  readonly actors: CastModel[];
}
