import styles from './Toasts.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import ToastsAction from '../../../stores/toasts/ToastsAction';
import { Card, Button } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';

const mapStateToProps = (state, ownProps) => ({
  toasts: state.toasts.items,
});

class Toasts extends React.Component {
  buttonColorMap = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  render() {
    const { toasts } = this.props;

    if (toasts.length === 0) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {toasts.map((item) => {
          const buttonColor = this.buttonColorMap[item.type];

          return (
            <Card key={item.id}>
              <Card.Content>
                <Card.Header content={item.type} />
                <Card.Description content={item.message} />
              </Card.Content>
              <Card.Content extra={true}>
                <Button color={buttonColor} onClick={this._onClickRemoveNotification(item.id)}>
                  Close
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    );
  }

  _onClickRemoveNotification = (id) => (event, data) => {
    this.props.dispatch(ToastsAction.removeById(id));
  };
}

export { Toasts as Unconnected };
export default connect(mapStateToProps)(Toasts);
