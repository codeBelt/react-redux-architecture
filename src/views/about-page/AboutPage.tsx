import styles from './AboutPage.module.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../models/IStore';
import { selectErrorText } from '../../selectors/error/ErrorSelector';
import ShowsAction from '../../stores/shows/ShowsAction';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { Header, Message, Container } from 'semantic-ui-react';
import { Dispatch } from 'redux';

interface IProps {}

const AboutPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowsAction.requestError());
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ShowsAction.REQUEST_ERROR]));
  const requestErrorText: string = useSelector((state: IStore) => selectErrorText(state, [ShowsAction.REQUEST_ERROR_FINISHED]));

  return (
    <div className={styles.wrapper}>
      <Header as="h2">About</Header>
      <LoadingIndicator isActive={isRequesting}>
        <Container>
          <p>
            This page is only to show how to handle API errors on the page. You will also notice a popup indicator with the actual error text. Below
            we create a custom error message.
          </p>
        </Container>
        {requestErrorText && <Message info={true} header="Error" content="Sorry there was an error requesting this content." />}
      </LoadingIndicator>
    </div>
  );
};

export default AboutPage;
