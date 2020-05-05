import { createSelector } from 'reselect';

const createPosition = state => state.position.createPosition;
const updatePosition = state => state.position.updatePosition;

export const activeLoadingSelector = createSelector(
  [createPosition, updatePosition],
  (createPosition, updatePosition) => {
    const { loading: createLoading } = createPosition;
    const { pendings: updatePendings } = updatePosition;
    return createLoading || (updatePendings.length > 0);
  }
);