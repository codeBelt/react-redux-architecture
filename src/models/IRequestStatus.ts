import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IRequestStatus<P> {
  isLoading: boolean;
  data: P | null;
  error: HttpErrorResponseModel | null;
  meta: any;
}

export const initialRequestStatus: IRequestStatus<null> = {
  isLoading: false,
  error: null,
  data: null,
  meta: null,
};
