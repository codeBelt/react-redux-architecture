import React from 'react';
import IEpisodeTable from '../../stores/shows/computed/IEpisodeTable';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import EpisodesTable from './components/episodes-table/EpisodesTable';
import RootStore from '../../RootStore';
import { inject, observer } from 'mobx-react';

interface IProps {
  rootStore?: RootStore;
}
interface IState {}

@inject('rootStore')
@observer
export default class EpisodesPage extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.rootStore?.userStore.requestEpisodes();
  }

  public render(): JSX.Element {
    const episodeTables = this.props.rootStore?.userStore!.selectEpisodes;

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
