import { find } from 'lodash';
import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const inviteOtherCreateAccount = state => state.register.inviteOtherPeopleCreateAccount;

export const bgColorSelector = createSelector(
  [colors],
  (colors) => find(colors, { 'selected': true })
);

export const actionLoadingSelector = createSelector(
  [inviteOtherCreateAccount],
  (inviteOtherCreateAccount) => {
    const { loading } = inviteOtherCreateAccount;
    return loading;
  }
);