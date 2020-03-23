import { concat } from 'lodash';
import { createSelector } from 'reselect';

const listPosition = state => state.position.listPosition;
const createPosition = state => state.position.createPosition;
const updatePosition = state => state.position.updatePosition;
const deletePosition = state => state.position.deletePosition;

export const positionsSelector = createSelector(
  [listPosition, createPosition, updatePosition, deletePosition],
  (listPosition, createPosition, updatePosition, deletePosition) => {
    const { data: { positions }, loading: listLoading, error: listError } = listPosition;
    const { loading: createLoading, error: createError } = createPosition;
    const { pendings: updatePendings, error: updateError } = updatePosition;
    const { pendings: deletePendings, error: deleteError } = deletePosition;
    return {
      positions,
      loading: listLoading || createLoading,
      error: listError || createError || updateError || deleteError,
      pendings: concat(updatePendings, deletePendings),
    }
  }
);