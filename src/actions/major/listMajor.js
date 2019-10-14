import {
  LIST_MAJOR,
  LIST_MAJOR_SUCCESS,
  LIST_MAJOR_FAIL,
} from '../../constants/actions/major/listMajor';

export const listMajor = () => ({
  type: LIST_MAJOR,
});

export const listMajorSuccess = ({ majors }) => ({
  type: LIST_MAJOR_SUCCESS,
  data: {
    majors,
  },
});

export const listMajorFail = (error) => ({
  type: LIST_MAJOR_FAIL,
  error: error,
});