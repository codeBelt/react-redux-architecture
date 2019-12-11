import styles from './Toasts.module.scss';

import React from 'react';
import IToast from '../../../stores/toasts/models/IToast';
import ToastCard from '../toast-card/ToastCard';
import ToastsStore from '../../../stores/toasts/ToastsStore';
import { inject, observer } from 'mobx-react';

interface IProps {
  readonly toastsStore?: ToastsStore;
}
interface IState {}

@inject('toastsStore')
@observer
export default class Toasts extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element | null {
    const { items } = this.props.toastsStore!;

    if (items.length === 0) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {items.map((model: IToast) => (
          <ToastCard key={model.id} item={model} />
        ))}
      </div>
    );
  }
}
