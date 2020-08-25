import { createSelector } from 'reselect';

const colors = state => state.setting.colors;

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    return colors.find(item => item.selected === true);
  }
)