// import styles from './ToastCard.module.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../../../models/IStore';
import { ReduxProps } from '../../../models/ReduxProps';
import { Button, ButtonProps, Card, SemanticCOLORS } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';
import IToast from '../../../stores/toasts/models/IToast';
import ToastsAction from '../../../stores/toasts/ToastsAction';

interface IProps {
  readonly item: IToast;
}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class ToastCard extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {
  public buttonColorMap: Record<ToastStatusEnum, SemanticCOLORS> = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  public render(): JSX.Element {
    const { item } = this.props;
    const buttonColor: SemanticCOLORS = this.buttonColorMap[item.type];

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

  private _onClickRemoveNotification = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps): void => {
    this.props.dispatch(ToastsAction.removeById(this.props.item.id));
  };
}

export { ToastCard as Unconnected };
export default connect(mapStateToProps)(ToastCard);
