import {
  DELETE_MAJOR,
  DELETE_MAJOR_SUCCESS,
  DELETE_MAJOR_FAIL,
} from '../../constants/actions/major/deleteMajor';

export const deleteMajor = ({ majorId }) => ({
  type: DELETE_MAJOR,
  options: {
    majorId,
  }
});

export const deleteMajorSuccess = (options) => ({
  type: DELETE_MAJOR_SUCCESS,
  options,
});

export const deleteMajorFail = (error, options) => ({
  type: DELETE_MAJOR_FAIL,
  options,
  error,
});