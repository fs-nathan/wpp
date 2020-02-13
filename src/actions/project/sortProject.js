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

export const sortProjectSuccess = () => ({
  type: SORT_PROJECT_SUCCESS,
  data: {
  },
});

export const sortProjectFail = (error) => ({
  type: SORT_PROJECT_FAIL,
  error: error,
});