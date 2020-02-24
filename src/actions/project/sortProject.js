import {
  SORT_PROJECT,
  SORT_PROJECT_FAIL,
  SORT_PROJECT_SUCCESS,
} from '../../constants/actions/project/sortProject';

export const sortProject = ({ sortData, groupId }) => ({
  type: SORT_PROJECT,
  options: {
    sortData,
    groupId,
  },
});

export const sortProjectSuccess = (options) => ({
  type: SORT_PROJECT_SUCCESS,
  options,
});

export const sortProjectFail = (error, options) => ({
  type: SORT_PROJECT_FAIL,
  options,
  error,
});