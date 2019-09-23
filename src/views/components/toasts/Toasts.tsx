import styles from './Toasts.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import { ReduxProps } from '../../../models/ReduxProps';
import IStore from '../../../models/IStore';
import IToast from '../../../stores/toasts/models/IToast';
import ToastsAction from '../../../stores/toasts/ToastsAction';

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
        {toasts.map((item: IToast) => (
          <div key={item.id} onClick={this._onClickRemoveNotification(item.id)}>
            {item.message}
          </div>
        ))}
      </div>
    );
  }

  private _onClickRemoveNotification = (id: string) => (event: React.MouseEvent<HTMLDivElement>): void => {
    this.props.dispatch(ToastsAction.removeToast(id));
  };
}

export { Toasts as Unconnected };
export default connect(mapStateToProps)(Toasts);
