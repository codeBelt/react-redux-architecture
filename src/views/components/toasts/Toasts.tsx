import styles from './Toasts.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import { ReduxProps } from '../../../models/ReduxProps';
import IStore from '../../../models/IStore';
import IToast from '../../../stores/toasts/models/IToast';
import ToastCard from '../toast-card/ToastCard';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly toasts: IToast[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  toasts: state.toasts.items,
});

class Toasts extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {
  public render(): JSX.Element | null {
    const { toasts } = this.props;

    if (toasts.length === 0) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {toasts.map((model: IToast) => (
          <ToastCard key={model.id} item={model} />
        ))}
      </div>
    );
  }
}

export { Toasts as Unconnected };
export default connect(mapStateToProps)(Toasts);
