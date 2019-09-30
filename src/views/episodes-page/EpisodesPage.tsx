import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../models/IStore';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import IEpisodeTable from '../../selectors/episodes/models/IEpisodeTable';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import EpisodesTable from './components/episodes-table/EpisodesTable';
import { Dispatch } from 'redux';

interface IProps {}

const EpisodesPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestEpisodes());
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ShowsAction.REQUEST_EPISODES]));
  const episodeTables: IEpisodeTable[] = useSelector((state: IStore) => selectEpisodes(state));

  return (
    <>
      <LoadingIndicator isActive={isRequesting} />
      {episodeTables.map((model: IEpisodeTable) => (
        <EpisodesTable key={model.title} tableData={model} />
      ))}
    </>
  );
};

export default EpisodesPage;
