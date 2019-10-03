import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../models/IStore';
import * as ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import IEpisodeTable from '../../selectors/episodes/models/IEpisodeTable';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import EpisodesTable from './components/episodes-table/EpisodesTable';
import { Dispatch } from 'redux';

interface IProps {}

export default function EpisodesPage(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestEpisodes());
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ShowsAction.REQUEST_EPISODES]));
  const episodeTables: IEpisodeTable[] = useSelector(selectEpisodes);

  return (
    <>
      <LoadingIndicator isActive={isRequesting} />
      {episodeTables.map((model: IEpisodeTable) => (
        <EpisodesTable key={model.title} tableData={model} />
      ))}
    </>
  );
}
