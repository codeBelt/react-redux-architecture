import { RouterStore } from 'mobx-react-router';
import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';

export class RootStore {
  showsStore: ShowsStore = new ShowsStore(this);
  toastsStore: ToastsStore = new ToastsStore(this);
  routingStore: RouterStore = new RouterStore();
}

export const rootStore = new RootStore();
