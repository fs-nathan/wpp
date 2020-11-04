import {
  KANBAN_SETTING_SET_VISIBLE_HEADER,
  KANBAN_SETTING_SET_STATUS_FILTER,
  KANBAN_SETTING_SET_PRIORITY_FILTER,
  KANBAN_SETTING_SET_MEMBER_FILTER,
  KANBAN_SETTING_SET_MEMBER_SEARCH,
  KANBAN_SETTING_SET_TASK_SEARCH,
} from 'constants/actions/kanban/setting';

export const setVisibleHeader = visible => ({
  type: KANBAN_SETTING_SET_VISIBLE_HEADER,
  options: {
    visible,
  },
});

export const setStatusFilter = statusFilter => ({
  type: KANBAN_SETTING_SET_STATUS_FILTER,
  options: {
    statusFilter,
  },
});

export const setPriorityFilter = priorityFilter => ({
  type: KANBAN_SETTING_SET_PRIORITY_FILTER,
  options: {
    priorityFilter,
  },
});

export const setMemberFilter = memberFilter => ({
  type: KANBAN_SETTING_SET_MEMBER_FILTER,
  options: {
    memberFilter,
  },
});

export const searchMember = searchStr => ({
  type: KANBAN_SETTING_SET_MEMBER_SEARCH,
  options: {
    searchStr,
  },
});

export const searchTask = searchStr => ({
  type: KANBAN_SETTING_SET_TASK_SEARCH,
  options: {
    searchStr,
  },
});