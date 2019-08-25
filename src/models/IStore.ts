import { RouterState } from 'connected-react-router';
// import IMetaState from '../stores/Meta/IMetaState';

export default interface IStore {
  readonly router: RouterState;
  // readonly scheduler: IScheduleState;
}
