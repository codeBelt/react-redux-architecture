import { createSelector } from 'reselect';

export const selectRequesting = createSelector(
  (state) => state.requesting,
  (state, actionTypes) => actionTypes,
  _selectRequesting
);

function _selectRequesting(requestingState, actionTypes) {
  return actionTypes.some((actionType) => requestingState[actionType]);
}
