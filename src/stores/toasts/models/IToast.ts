import ToastStatusEnum from '../../../constants/ToastStatusEnum';

export default interface IToast {
  readonly type: ToastStatusEnum;
  readonly message: string;
  readonly id: string;
}
