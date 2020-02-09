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

export const deleteMajorSuccess = () => ({
  type: DELETE_MAJOR_SUCCESS,
});

export const deleteMajorFail = (error) => ({
  type: DELETE_MAJOR_FAIL,
  error: error,
});