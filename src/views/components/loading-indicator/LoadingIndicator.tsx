import styles from './LoadingIndicator.module.scss';

import React from 'react';
import classNames from 'classnames';
import { Loader } from 'semantic-ui-react';

interface IProps {
  readonly isActive?: boolean;
  readonly className?: string;
}
interface IState {}

export default class LoadingIndicator extends React.PureComponent<IProps, IState> {
  public static defaultProps: IProps = {
    isActive: false,
    className: undefined,
  };

  public render(): JSX.Element {
    const { children, isActive } = this.props;
    const cssClasses: string = classNames(this.props.className, {
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
  }
}
