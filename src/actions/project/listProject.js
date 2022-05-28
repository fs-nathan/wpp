import {
  LIST_PROJECT,
  LIST_PROJECT_FAIL,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_SELECT,
  LIST_PROJECT_SELECT_SUCCESS,
  CHECK_HAS_RECENTLY_PROJECT,
  CHECK_HAS_RECENTLY_PROJECT_SUCCESS,
  COUNT_PERSONAL_PROJECTS_BOARD,
  COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS
} from '../../constants/actions/project/listProject';
import {apiService} from '../../constants/axiosInstance';

export const listProject = ({ groupProject, type, status, timeStart, timeEnd, type_data, select }, quite = false) => ({
  type: LIST_PROJECT,
  quite,
  options: {
    groupProject,
    type,
    status, select,
    timeStart, timeEnd, type_data
  },
});

export const listProjectSuccess = ({ projects, summary, ...params }, options) => ({
  type: LIST_PROJECT_SUCCESS,
  options,
  data: {
    projects,
    summary,
    ...params
  }
});

export const listProjectFail = (error, options) => ({
  type: LIST_PROJECT_FAIL,
  options,
  error,
});

export const listProjectForSelect = () => ({
  type: LIST_PROJECT_SELECT,
  options: {isForSelect: true}
});

export const listProjectForSelectSuccess = ({projects}) => ({
  type: LIST_PROJECT_SELECT_SUCCESS,
  projects
});

export const checkHasRecentlyProjects = () => ({
  type: CHECK_HAS_RECENTLY_PROJECT,
  options: {
    type_data: 1
  }
});

export const checkHasRecentlyProjectsSuccess = ({isHas}) => ({
  type: CHECK_HAS_RECENTLY_PROJECT_SUCCESS,
  isHas
});

export const countPersonalProjectsBoard = () => ({
  type: COUNT_PERSONAL_PROJECTS_BOARD,
  options: {
    type_data: 2
  }
});
export const countPersonalProjectsBoardSuccess = ({projects}) => ({
  type: COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS,
  projects
});

export const getListBasicProject = (params = {}) => {
  return apiService({
    url: '/project/list-basic',
    method: 'get',
    params
  });
};
