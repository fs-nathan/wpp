import {
  UPDATE_MAJOR,
  UPDATE_MAJOR_SUCCESS,
  UPDATE_MAJOR_FAIL,
} from '../../constants/actions/major/updateMajor';

export const updateMajor = ({ majorId, name, description }) => ({
  type: UPDATE_MAJOR,
  options: {
    majorId,
    name,
    description,
  }
});

export const updateMajorSuccess = ({ major }, options) => ({
  type: UPDATE_MAJOR_SUCCESS,
  options,
  data: {
    major,
  }
});

export const updateMajorFail = (error, options) => ({
  type: UPDATE_MAJOR_FAIL,
  options,
  error,
});