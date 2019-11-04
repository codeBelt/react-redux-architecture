import styles from './Toasts.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import ToastCard from '../toast-card/ToastCard';

const mapStateToProps = (state, ownProps) => ({
  toasts: state.toasts.items,
});

class Toasts extends React.Component {
  render() {
    const { toasts } = this.props;

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
}

export { Toasts as Unconnected };
export default connect(mapStateToProps)(Toasts);
