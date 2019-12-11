import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IRequestStatus<P> {
  isRequesting: boolean;
  data: P | null;
  error: HttpErrorResponseModel | null;
  meta: any;
}

export const initialRequestStatus: IRequestStatus<null> = {
  isRequesting: false,
  error: null,
  data: null,
  meta: null,
};
