import styles from './AboutPage.module.scss';

import React from 'react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { Header, Container } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ShowsStore from '../../stores/shows/ShowsStore';

interface IProps {
  showsStore?: ShowsStore;
}
interface IState {}

@inject('showsStore')
@observer
export default class AboutPage extends React.Component<IProps, IState> {
  public componentDidMount(): void {
    this.props.showsStore!.requestError();
  }

  public render(): JSX.Element {
    // const { isRequesting, requestErrorText } = this.props;

    return (
      <div className={styles.wrapper}>
        <Header as="h2">About</Header>
        <LoadingIndicator isActive={false}>
          <Container>
            <p>
              This page is only to show how to handle API errors on the page. You will also notice a popup indicator with the actual error text. Below
              we create a custom error message.
            </p>
          </Container>
          {/*{requestErrorText && <Message info={true} header="Error" content="Sorry there was an error requesting this content." />}*/}
        </LoadingIndicator>
      </div>
    );
  }
}
