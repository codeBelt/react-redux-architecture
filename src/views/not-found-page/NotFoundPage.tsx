import styles from './NotFoundPage.module.scss';

import React from 'react';

interface IProps {}
interface IState {}

const NotFoundPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <div className={styles.wrapper}>Not found page</div>;
};

export default NotFoundPage;
