import { selectRequesting } from './RequestingSelector';

describe('RequestingSelector', () => {
  let store: any;

  beforeEach(() => {
    store = {
      requesting: {
        ['SomeAction.REQUEST_TEST']: true,
      },
    };
  });

  describe('selectRequesting', () => {
    it('should return true', () => {
      const actualResult: boolean = selectRequesting(store, ['SomeAction.REQUEST_TEST']);

      expect(actualResult).toBe(true);
    });

    it('should return false', () => {
      const actualResult: boolean = selectRequesting(store, ['SomeAction.REQUEST_OTHER']);

      expect(actualResult).toBe(false);
    });
  });
});
