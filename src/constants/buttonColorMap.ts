import ToastStatusEnum from './ToastStatusEnum';
import { SemanticCOLORS } from 'semantic-ui-react';

const buttonColorMap: Record<ToastStatusEnum, SemanticCOLORS> = {
  [ToastStatusEnum.Error]: 'red',
  [ToastStatusEnum.Warning]: 'orange',
  [ToastStatusEnum.Success]: 'green',
};

export default buttonColorMap;
