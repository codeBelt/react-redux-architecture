// import styles from './ToastCard.module.scss';

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import * as ToastsAction from '../../../stores/toasts/ToastsAction';
import buttonColorMap from '../../../constants/buttonColorMap';

export default function ToastCard(props) {
  const dispatch = useDispatch();

  const onClickRemoveNotification = useCallback(
    (event, data) => {
      dispatch(ToastsAction.removeById(props.item.id));
    },
    [dispatch, props.item.id]
  );

  const buttonColor = buttonColorMap[props.item.type];

  return (
    <Card key={props.item.id}>
      <Card.Content>
        <Card.Header content={props.item.type} />
        <Card.Description content={props.item.message} />
      </Card.Content>
      <Card.Content extra={true}>
        <Button color={buttonColor} onClick={onClickRemoveNotification}>
          Close
        </Button>
      </Card.Content>
    </Card>
  );
}
