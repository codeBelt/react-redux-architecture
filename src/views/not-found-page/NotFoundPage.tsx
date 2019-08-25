import styles from './NotFoundPage.module.scss';

import * as React from 'react';

interface IProps {}
interface IState {}

export default class NotFoundPage extends React.Component<IProps, IState> {
  // public static defaultProps: Partial<IProps> = {};

  // public state: IState = {};

  public render(): JSX.Element {
    return <div className={styles.wrapper}>Not found page</div>;
  }
}
