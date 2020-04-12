import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  () => {
    const { group_active } = profile;
    const modules = get(group_active, 'modules', []);
    const route = get(find(modules, { name: "Calendar" }), 'url_redirect', '/calendar');
    return route;
  }
);