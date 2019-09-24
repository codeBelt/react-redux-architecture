import ToastStatusEnum from '../constants/ToastStatusEnum';
import ToastsAction from '../stores/toasts/ToastsAction';

const errorToastMiddleware = () => (store) => (next) => (action) => {
  if (action.error) {
    const errorAction = action;

    next(ToastsAction.add(errorAction.payload.message, ToastStatusEnum.Error));
  }

  next(action);
};

export default errorToastMiddleware;
