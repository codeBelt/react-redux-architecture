import ShowsStore from './stores/shows/ShowsStore';

export default class RootStore {
  userStore: ShowsStore = new ShowsStore(this);
}
