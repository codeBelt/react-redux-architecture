import IEpisodeTableRow from './IEpisodeTableRow';

export default interface IEpisodeTable {
  readonly title: string;
  readonly rows: IEpisodeTableRow[];
}
