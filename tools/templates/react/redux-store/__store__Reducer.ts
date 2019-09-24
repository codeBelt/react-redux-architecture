import I__store__State from './models/I__store__State';
import __store__Action from './__store__Action';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

export default class __store__Reducer extends BaseReducer<I__store__State> {
  public readonly initialState: I__store__State = {
    __model__(camelCase): null,
  };

  public [__store__Action.REQUEST___model__(constantCase)_FINISHED](state: I__store__State, action: IAction<__model__ResponseModel>): I__store__State {
    return {
      ...state,
      __model__(camelCase): action.payload!,
    };
  }
}
