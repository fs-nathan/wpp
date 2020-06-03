import { getUserRoleType1, getUserRoleType2, getUserRoleType3 } from './i18nSelectors';

export const SEND_MODE = {
  CREATE: 0,
  UPDATE: 1,
};
export const USER_ROLE = (t) => [
  { type: 0, label: getUserRoleType1(t) },
  { type: 1, label: getUserRoleType2(t) },
  { type: 2, label: getUserRoleType3(t) },
];
