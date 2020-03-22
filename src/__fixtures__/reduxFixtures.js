import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const mockStoreFixture = (state) => {
  const middlewares = [thunk];
  const storeCreator = configureStore(middlewares);

  return storeCreator(state);
};
