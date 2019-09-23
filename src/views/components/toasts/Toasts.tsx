import styles from './Toasts.module.scss';

import React from 'react';
import { connect } from 'react-redux';
import { ReduxProps } from '../../../models/ReduxProps';
import IStore from '../../../models/IStore';
import IToast from '../../../stores/toasts/models/IToast';
import ToastsAction from '../../../stores/toasts/ToastsAction';
import { Card, Button, ButtonProps, SemanticCOLORS } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly toasts: IToast[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  toasts: state.toasts.items,
});

class Toasts extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {
  public buttonColorMap: Record<ToastStatusEnum, SemanticCOLORS> = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  public render(): JSX.Element | null {
    const { toasts } = this.props;

    if (toasts.length === 0) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {toasts.map((item: IToast) => {
          const buttonColor: SemanticCOLORS = this.buttonColorMap[item.type];

          return (
            <Card key={item.id}>
              <Card.Content>
                <Card.Header content={item.type} />
                <Card.Description content={item.message} />
              </Card.Content>
              <Card.Content extra>
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

  private _onClickRemoveNotification = (id: string) => (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps): void => {
    this.props.dispatch(ToastsAction.removeToast(id));
  };
}

export { Toasts as Unconnected };
export default connect(mapStateToProps)(Toasts);
