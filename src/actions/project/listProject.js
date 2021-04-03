import {
  LIST_PROJECT,
  LIST_PROJECT_FAIL,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_SELECT,
  LIST_PROJECT_SELECT_SUCCESS
} from '../../constants/actions/project/listProject';

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

export const listProjectSuccess = ({ projects, summary }, options) => ({
  type: LIST_PROJECT_SUCCESS,
  options,
  data: {
    projects,
    summary,
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