import {
  COPY_PROJECT,
  COPY_PROJECT_FAIL,
  COPY_PROJECT_SUCCESS,
} from '../../constants/actions/project/copyProject';

export const copyProject = ({ projectId, name, description, startDate, isCopyMember, workType }) => ({
  type: COPY_PROJECT,
  options: {
    projectId,
    name,
    description,
    startDate,
    isCopyMember,
    workType
  },
});

export const copyProjectSuccess = ({ project }, options) => ({
  type: COPY_PROJECT_SUCCESS,
  options,
  data: {
    project,
  }
});

export const copyProjectFail = (error, options) => ({
  type: COPY_PROJECT_FAIL,
  options,
  error,
});