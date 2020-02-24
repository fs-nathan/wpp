import { createSelector } from 'reselect';

const listIcon = state => state.icon.listIcon;
const createIcon = state => state.icon.createIcon;
const deleteIcon = state => state.icon.deleteIcon;

export const iconsSelector = createSelector(
  [listIcon],
  (listIcon) => {
    const { data: { icons, defaults }, error, loading } = listIcon;
    return {
      createds: icons,
      defaults,
      loading,
      error,
    }
  }
);

export const mutateIconSelector = createSelector(
  [createIcon, deleteIcon],
  (createIcon, deleteIcon) => {
    const { error, loading: deleteIconLoading } = deleteIcon;
    const { loading: createIconLoading } = createIcon;
    return {
      loading: deleteIconLoading || createIconLoading,
      error,
    }
  }
);