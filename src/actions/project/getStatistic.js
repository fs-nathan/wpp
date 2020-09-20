import {
  GET_PROJECT_STATISTIC,
  GET_PROJECT_STATISTIC_SUCCESS,
  GET_GET_PROJECT_STATISTIC_FAIL
} from '../../constants/actions/project/getStatistic';

export const getProjectStatistic = () => ({
  type: GET_PROJECT_STATISTIC,
});

export const getProjectStatisticSuccess = ({ number_process, number_project, number_work_topic }, options) => ({
  type: GET_PROJECT_STATISTIC_SUCCESS,
  options,
  data: {
    number_process, number_project, number_work_topic
  }
});

export const getProjectStatisticFail = (error, options) => ({
  type: GET_GET_PROJECT_STATISTIC_FAIL,
  options,
  error,
});