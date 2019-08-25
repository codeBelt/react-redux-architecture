import IShowState from './models/IShowState';
import ShowAction, { ShowActionUnion } from './ShowAction';
import ShowResponseModel from './models/show/ShowResponseModel';
import IAction from '../../models/IAction';

export default class ShowReducer {
  public static readonly initialState: IShowState = {
    show: null,
  };

  public static reducer(state: IShowState = ShowReducer.initialState, action: IAction<ShowActionUnion>): IShowState {
    if (action.error) {
      return state;
    }

    switch (action.type) {
      case ShowAction.REQUEST_SHOW_FINISHED:
        return {
          ...state,
          show: action.payload as ShowResponseModel,
        };
      default:
        return state;
    }
  }
}
