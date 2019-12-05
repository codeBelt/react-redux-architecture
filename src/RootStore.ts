import ShowsStore from './stores/shows/ShowsStore';
import { RouterStore } from 'mobx-react-router';

export default class RootStore {
  userStore: ShowsStore = new ShowsStore(this);
  routingStore = new RouterStore();
}
