import styles from './NotFoundPage.module.scss';

import * as React from 'react';

interface IProps {}
interface IState {}

export default class NotFoundPage extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return <div className={styles.wrapper}>Not found page</div>;
  }
}
