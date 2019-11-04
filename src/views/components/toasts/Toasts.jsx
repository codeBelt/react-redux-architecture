import styles from './Toasts.module.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import ToastCard from '../toast-card/ToastCard';

export default function Toasts(props) {
  const toasts = useSelector((state) => state.toasts.items);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {toasts.map((model) => (
        <ToastCard key={model.id} item={model} />
      ))}
    </div>
  );
}
