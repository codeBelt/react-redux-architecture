import styles from './LoadingIndicator.module.scss';

import React from 'react';
import classNames from 'classnames';
import { Loader } from 'semantic-ui-react';

interface IProps {
  readonly isActive?: boolean;
  readonly className?: string;
}

const LoadingIndicator: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { isActive = false } = props; // defaultProps example
  const { className, children } = props;

  const cssClasses: string = classNames(className, {
    [styles.wrapper]: isActive,
  });

  return (
    <div className={cssClasses}>
      {isActive && (
        <div className={styles.loaderContainer}>
          <Loader content="Loading" active={true} inverted={true} size="huge" />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingIndicator;
