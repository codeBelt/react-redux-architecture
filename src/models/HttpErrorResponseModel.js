import uuid from 'uuid/v4';

export default class HttpErrorResponseModel {
  id = uuid();
  status = 0;
  message = '';
  errors = [];
  url = '';
  raw = null;
}
