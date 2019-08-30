import { RouterState } from 'connected-react-router';
import IShowState from '../stores/show/models/IShowState';

export default interface IStore {
  readonly router: RouterState;
  readonly show: IShowState;
}
