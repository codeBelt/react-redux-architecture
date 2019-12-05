import { RouterStore } from 'mobx-react-router';
import ShowsStore from './shows/ShowsStore';

class RootStore {
  userStore: ShowsStore = new ShowsStore(this);
  routingStore: RouterStore = new RouterStore();
}

export const rootStore = new RootStore();
