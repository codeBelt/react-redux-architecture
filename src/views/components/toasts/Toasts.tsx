import styles from './Toasts.module.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../../models/IStore';
import IToast from '../../../stores/toasts/models/IToast';
import ToastsAction from '../../../stores/toasts/ToastsAction';
import { Card, Button, ButtonProps, SemanticCOLORS } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';
import { Dispatch } from 'redux';

interface IProps {}

const Toasts: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const buttonColorMap: Record<ToastStatusEnum, SemanticCOLORS> = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  const toasts: IToast[] = useSelector((state: IStore) => state.toasts.items);

  if (toasts.length === 0) {
    return null;
  }

  const onClickRemoveNotification = (id: string) => (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps): void => {
    dispatch(ToastsAction.removeById(id));
  };

  return (
    <div className={styles.wrapper}>
      {toasts.map((item: IToast) => {
        const buttonColor: SemanticCOLORS = buttonColorMap[item.type];

        return (
          <Card key={item.id}>
            <Card.Content>
              <Card.Header content={item.type} />
              <Card.Description content={item.message} />
            </Card.Content>
            <Card.Content extra={true}>
              <Button color={buttonColor} onClick={onClickRemoveNotification(item.id)}>
                Close
              </Button>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
};

export default Toasts;
