import styles from './Toasts.module.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../../models/IStore';
import IToast from '../../../stores/toasts/models/IToast';
import ToastCard from '../toast-card/ToastCard';

interface IProps {}

const Toasts: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const toasts: IToast[] = useSelector((state: IStore) => state.toasts.items);

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
};

export default Toasts;
