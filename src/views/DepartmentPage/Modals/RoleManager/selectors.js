import { createSelector } from 'reselect';

const listUserRole = state => state.userRole.listUserRole;

export const userRolesSelector = createSelector(
  [listUserRole],
  (listUserRole) => {
    const { data: { userRoles }, loading, error } = listUserRole;
    return {
      userRoles,
      loading,
      error,
    }
  }
);