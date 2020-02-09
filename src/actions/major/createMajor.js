import {
  CREATE_MAJOR,
  CREATE_MAJOR_SUCCESS,
  CREATE_MAJOR_FAIL,
} from '../../constants/actions/major/createMajor';

export const createMajor = ({ name, description }) => ({
  type: CREATE_MAJOR,
  options: {
    name,
    description,
  }
});

export const createMajorSuccess = ({ major }) => ({
  type: CREATE_MAJOR_SUCCESS,
  data: {
    major,
  },
});

export const createMajorFail = (error) => ({
  type: CREATE_MAJOR_FAIL,
  error: error,
});