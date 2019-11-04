// import styles from './ToastCard.module.scss';

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps, Card, SemanticCOLORS } from 'semantic-ui-react';
import IToast from '../../../stores/toasts/models/IToast';
import * as ToastsAction from '../../../stores/toasts/ToastsAction';
import { Dispatch } from 'redux';
import buttonColorMap from '../../../constants/buttonColorMap';

interface IProps {
  readonly item: IToast;
}

export default function ToastCard(props: React.PropsWithChildren<IProps>): React.FunctionComponentElement<IProps> | null {
  const dispatch: Dispatch = useDispatch();

  const onClickRemoveNotification = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps): void => {
      dispatch(ToastsAction.removeById(props.item.id));
    },
    [dispatch, props.item.id]
  );

  const buttonColor: SemanticCOLORS = buttonColorMap[props.item.type];

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
