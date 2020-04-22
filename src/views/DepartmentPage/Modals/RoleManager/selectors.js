import { concat } from 'lodash';
import { createSelector } from 'reselect';

const listUserRole = state => state.userRole.listUserRole;
const createUserRole = state => state.userRole.createUserRole;
const updateUserRole = state => state.userRole.updateUserRole;
const deleteUserRole = state => state.userRole.deleteUserRole;

export const userRolesSelector = createSelector(
  [listUserRole, createUserRole, updateUserRole, deleteUserRole],
  (listUserRole, createUserRole, updateUserRole, deleteUserRole) => {
    const { data: { userRoles }, loading: listLoading, error: listError, firstTime } = listUserRole;
    const { loading: createLoading, error: createError } = createUserRole;
    const { pendings: updatePendings, error: updateError } = updateUserRole;
    const { pendings: deletePendings, error: deleteError } = deleteUserRole;
    return {
      userRoles,
      loading: (firstTime ? false : listLoading) || createLoading,
      error: listError || createError || updateError || deleteError,
      pendings: concat(updatePendings, deletePendings),
      firstTime,
    }
  }
);