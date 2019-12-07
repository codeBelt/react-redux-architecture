import React from 'react';
import IEpisodeTable from '../../stores/shows/computed/IEpisodeTable';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import EpisodesTable from './components/episodes-table/EpisodesTable';
import { inject, observer } from 'mobx-react';
import ShowsStore from '../../stores/shows/ShowsStore';

interface IProps {
  showsStore?: ShowsStore;
}
interface IState {}

@inject('showsStore')
@observer
export default class EpisodesPage extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.showsStore!.requestEpisodes();
  }

  public render(): JSX.Element {
    const episodeTables = this.props.showsStore!.selectEpisodes;

    return (
      <>
        <LoadingIndicator isActive={false} />
        {episodeTables.map((model: IEpisodeTable) => (
          <EpisodesTable key={model.title} tableData={model} />
        ))}
      </>
    );
  }
}
