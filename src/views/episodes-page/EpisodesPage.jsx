import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ShowsAction from '../../stores/shows/ShowsAction';
import { selectEpisodes } from '../../selectors/episodes/EpisodesSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import EpisodesTable from './components/episodes-table/EpisodesTable';

export default function EpisodesPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestEpisodes());
  }, [dispatch]);

  const isRequesting = useSelector((state) => selectRequesting(state, [ShowsAction.REQUEST_EPISODES]));
  const episodeTables = useSelector(selectEpisodes);

  return (
    <>
      <LoadingIndicator isActive={isRequesting} />
      {episodeTables.map((model) => (
        <EpisodesTable key={model.title} tableData={model} />
      ))}
    </>
  );
}
