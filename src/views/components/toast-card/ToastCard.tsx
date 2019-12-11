// import styles from './ToastCard.module.scss';

import * as React from 'react';
import { Button, ButtonProps, Card, SemanticCOLORS } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';
import IToast from '../../../stores/toasts/models/IToast';
import { inject, observer } from 'mobx-react';
import ToastsStore from '../../../stores/toasts/ToastsStore';

interface IProps {
  readonly item: IToast;
  readonly toastsStore?: ToastsStore;
}
interface IState {}

@inject('toastsStore')
@observer
export default class ToastCard extends React.PureComponent<IProps, IState> {
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
    this.props.toastsStore!.remove(this.props.item.id);
  };
}
