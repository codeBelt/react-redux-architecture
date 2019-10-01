import styles from './NotFoundPage.module.scss';

import React from 'react';

interface IProps {}

export default function NotFoundPage(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> {
  return <div className={styles.wrapper}>Not found page</div>;
}
