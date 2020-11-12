import {
  KANBAN_UPDATE_MANAGERS,
  KANBAN_UPDATE_MANAGERS_RESET,
  KANBAN_UPDATE_MANAGERS_SUCCESS,
  KANBAN_UPDATE_MANAGERS_FAIL,
} from 'constants/actions/kanban/updateManagers';

export const updateManagers = ({ groupId, managersAdded, managersRemoved }, quite = false) => ({
  type: KANBAN_UPDATE_MANAGERS,
  quite,
  options: {
    groupId,
    managersAdded,
    managersRemoved,
  },
});

export const updateManagersSuccess = ({ managers }, options) => ({
  type: KANBAN_UPDATE_MANAGERS_SUCCESS,
  options,
  data: {
    managers,
  }
});

export const updateManagersFail = (error, options) => ({
  type: KANBAN_UPDATE_MANAGERS_FAIL,
  options,
  error,
});

export const updateManagersReset = () => ({
  type: KANBAN_UPDATE_MANAGERS_RESET,
});