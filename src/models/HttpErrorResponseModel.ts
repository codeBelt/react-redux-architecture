import { v4 as uuidv4 } from 'uuid';
import IError from './IError';

export default class HttpErrorResponseModel implements IError {
  public readonly id: string = uuidv4();
  public status: number = 0;
  public message: string = '';
  public errors: string[] = [];
  public url: string = '';
  public raw: any = null;
}
