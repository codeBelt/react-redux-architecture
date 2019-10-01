import styles from './Toasts.module.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ToastsAction from '../../../stores/toasts/ToastsAction';
import { Card, Button } from 'semantic-ui-react';
import ToastStatusEnum from '../../../constants/ToastStatusEnum';

export default function Toasts(props) {
  const dispatch = useDispatch();

  const buttonColorMap = {
    [ToastStatusEnum.Error]: 'red',
    [ToastStatusEnum.Warning]: 'orange',
    [ToastStatusEnum.Success]: 'green',
  };

  const toasts = useSelector((state) => state.toasts.items);

  if (toasts.length === 0) {
    return null;
  }

  const onClickRemoveNotification = (id) => (event, data) => {
    dispatch(ToastsAction.removeById(id));
  };

  return (
    <div className={styles.wrapper}>
      {toasts.map((item) => {
        const buttonColor = buttonColorMap[item.type];

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
}
