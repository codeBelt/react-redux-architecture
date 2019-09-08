import { RouterState } from 'connected-react-router';
import IShowState from '../stores/show/models/IShowState';
import IRequestingState from '../stores/requesting/models/IRequestingState';
import IErrorState from '../stores/error/models/IErrorState';

export default interface IStore {
  readonly error: IErrorState;
  readonly requesting: IRequestingState;
  readonly router: RouterState;
  readonly show: IShowState;
}
