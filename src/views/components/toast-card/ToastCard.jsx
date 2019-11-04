// import styles from './ToastCard.module.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';
import ToastsAction from '../../../stores/toasts/ToastsAction';

const mapStateToProps = (state, ownProps) => ({});

class ToastCard extends React.Component {
  buttonColorMap = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  render() {
    const { item } = this.props;
    const buttonColor = this.buttonColorMap[item.type];

    return (
      <Card>
        <Card.Content>
          <Card.Header content={item.type} />
          <Card.Description content={item.message} />
        </Card.Content>
        <Card.Content extra={true}>
          <Button color={buttonColor} onClick={this._onClickRemoveNotification}>
            Close
          </Button>
        </Card.Content>
      </Card>
    );
  }

  _onClickRemoveNotification = (event, data) => {
    this.props.dispatch(ToastsAction.removeById(this.props.item.id));
  };
}

export { ToastCard as Unconnected };
export default connect(mapStateToProps)(ToastCard);
