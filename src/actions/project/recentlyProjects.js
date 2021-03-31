import {
  GET_PROJECTS_RECENTLY,
  GET_PROJECTS_RECENTLY_FAIL,
  GET_PROJECTS_RECENTLY_SUCCESS
} from '../../constants/actions/project/recentlyProjects';

export const getProjectRecently = () => ({
  type: GET_PROJECTS_RECENTLY,
});

export const getProjectRecentlySuccess = ({ projects }) => ({
  type: GET_PROJECTS_RECENTLY_SUCCESS,
  data: projects
});

export const getProjectRecentlyFail = (error) => ({
  type: GET_PROJECTS_RECENTLY_FAIL,
  error,
});