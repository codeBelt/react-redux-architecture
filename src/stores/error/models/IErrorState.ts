import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';

export default interface IErrorState {
  readonly [key: string]: HttpErrorResponseModel;
}
