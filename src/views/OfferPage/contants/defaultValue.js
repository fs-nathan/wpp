export const emptyArray = [];
export const emptyObject = [];

export const defaultStatusFilter = {
  offer_waiting: true,
  offer_accept: true,
  offer_reject: true,
  offer_approving: true
};
export const defaultRoleFilter = {
  you_handle: true,
  you_monitor: true,
  you_offer: true
};
export const defaultPriorityFilter = {
  normal: true,
  very_urgent: true,
  urgent: true
};

export const defaultFilter = {
  ...defaultStatusFilter,
  ...defaultPriorityFilter,
  ...defaultRoleFilter
};