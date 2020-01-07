import {
  COPY_PROJECT,
  COPY_PROJECT_FAIL,
  COPY_PROJECT_SUCCESS,
} from '../../constants/actions/project/copyProject';

export const copyProject = ({ projectId, name, description, startDate, isCopyMember }) => ({
  type: COPY_PROJECT,
  options: {
    projectId,
    name,
    description,
    startDate,
    isCopyMember
  },
});

export const copyProjectSuccess = () => ({
  type: COPY_PROJECT_SUCCESS,
  data: {
  },
});

export const copyProjectFail = (error) => ({
  type: COPY_PROJECT_FAIL,
  error: error,
});