import { createSelector } from 'reselect';

const createUserRole = state => state.userRole.createUserRole;
const updateUserRole = state => state.userRole.updateUserRole;

export const activeLoadingSelector = createSelector(
  [createUserRole, updateUserRole],
  (createUserRole, updateUserRole) => {
    const { loading: createLoading } = createUserRole;
    const { pendings: updatePendings } = updateUserRole;
    return createLoading || (updatePendings.length > 0);
  }
);