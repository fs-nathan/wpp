import {
  CANCEL_SHARE,
  CANCEL_SHARE_FAIL,
  CANCEL_SHARE_SUCCESS,
} from "../../constants/actions/project/cancelShare";

export const cancelShare = ({ templateId }) => ({
  type: CANCEL_SHARE,
  options: {
    templateId,
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
