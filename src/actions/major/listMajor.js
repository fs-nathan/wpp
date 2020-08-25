import {
  LIST_MAJOR,
  LIST_MAJOR_SUCCESS,
  LIST_MAJOR_FAIL,
  LIST_MAJOR_RESET,
} from '../../constants/actions/major/listMajor';

export const listMajor = (quite = false) => ({
  type: LIST_MAJOR,
  quite,
});

export const listMajorSuccess = ({ majors }, options) => ({
  type: LIST_MAJOR_SUCCESS,
  options,
  data: {
    majors,
  },
});

export const listMajorFail = (error, options) => ({
  type: LIST_MAJOR_FAIL,
  options,
  error,
});

export const listMajorReset = () => ({
  type: LIST_MAJOR_RESET,
});