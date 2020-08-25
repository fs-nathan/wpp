import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);