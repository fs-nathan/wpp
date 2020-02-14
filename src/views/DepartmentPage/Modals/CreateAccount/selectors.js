import { createSelector } from 'reselect';
import { find } from 'lodash';

const colors = state => state.setting.colors;

export const bgColorSelector = createSelector(
  [colors],
  (colors) => find(colors, { 'selected': true })
);