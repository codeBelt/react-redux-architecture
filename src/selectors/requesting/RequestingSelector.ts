import { createSelector, ParametricSelector } from 'reselect';
import IRequestingState from '../../stores/requesting/models/IRequestingState';
import IStore from '../../models/IStore';

const _selectRequesting = (requestingState: IRequestingState, actionTypes: string[]): boolean => {
  return actionTypes.some((actionType: string) => requestingState[actionType]);
};

export const selectRequesting: ParametricSelector<IStore, string[], boolean> = createSelector(
  (state: IStore) => state.requesting,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectRequesting
);
