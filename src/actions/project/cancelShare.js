import {
  CANCEL_SHARE,
  CANCEL_SHARE_FAIL,
  CANCEL_SHARE_SUCCESS,
} from "../../constants/actions/project/cancelShare";

export const cancelShare = ({ projectId }) => ({
  type: CANCEL_SHARE,
  options: {
    projectId,
  },
});

export const cancelShareSuccess = (options) => ({
  type: CANCEL_SHARE_SUCCESS,
  options,
});

export const cancelShareFail = (error, options) => ({
  type: CANCEL_SHARE_FAIL,
  options,
  error,
});
