import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IRequestStatus<T> {
  isRequesting: boolean;
  data: T;
  error: HttpErrorResponseModel | null;
  meta: any;
}

export const initialRequestStatus = <T>(defaultValue: T): IRequestStatus<T> => ({
  isRequesting: false,
  error: null,
  data: defaultValue,
  meta: null,
});
