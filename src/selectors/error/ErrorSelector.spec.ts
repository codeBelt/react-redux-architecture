import { selectErrorText, selectRawErrors, hasErrors } from './ErrorSelector';
import IErrorState from '../../stores/error/models/IErrorState';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

describe('ErrorSelector', () => {
  let store: any;
  let httpErrorResponseModel: any;
  const actionType: string = 'SomeAction.REQUEST_TEST_FINISHED';

  beforeEach(() => {
    httpErrorResponseModel = new HttpErrorResponseModel();

    httpErrorResponseModel.errors = ['Unauthorized'];

    store = {
      error: {
        [actionType]: httpErrorResponseModel,
      },
    };
  });

  describe('selectRawErrors', () => {
    it('should return same error model', () => {
      const actualResult: IErrorState = selectRawErrors(store, [actionType]);
      const expectedResult: IErrorState = store.error;

      expect(actualResult[actionType]).toBe(expectedResult[actionType]);
    });

    it('should return undefined value', () => {
      const actualResult: IErrorState = selectRawErrors(store, ['noop']);
      const expectedResult: any = {
        [actionType]: undefined,
      };

      expect(actualResult[actionType]).toBe(expectedResult[actionType]);
    });
  });

  describe('selectErrorText', () => {
    it('should return error text from error model(s)', () => {
      const actualResult: string = selectErrorText(store, [actionType]);
      const expectedResult: string = httpErrorResponseModel.errors.join(', ');

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return empty string', () => {
      const actualResult: string = selectErrorText(store, ['noop']);
      const expectedResult: string = '';

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('hasErrors', () => {
    it('should return false', () => {
      const actualResult: boolean = hasErrors(store, [actionType]);
      const expectedResult: boolean = true;

      expect(actualResult).toBe(expectedResult);
    });

    it('should return false', () => {
      const actualResult: boolean = hasErrors(store, ['noop']);
      const expectedResult: boolean = false;

      expect(actualResult).toBe(expectedResult);
    });
  });
});
