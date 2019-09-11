import styles from './NotFoundPage.module.scss';

import * as React from 'react';

export default class NotFoundPage extends React.PureComponent {
  render() {
    return <div className={styles.wrapper}>Not found page</div>;
  }
}
