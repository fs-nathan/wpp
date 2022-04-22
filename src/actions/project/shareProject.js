import {
  SHARE_PROJECT,
  SHARE_PROJECT_FAIL,
  SHARE_PROJECT_SUCCESS,
} from "../../constants/actions/project/shareProject";

export const shareProject = ({
  project_id,
  category_id,
  name,
  description,
  banner,
}) => ({
  type: SHARE_PROJECT,
  options: {
    project_id,
    category_id,
    name,
    description,
    banner,
  },
});

export const shareProjectSuccess = (options) => ({
  type: SHARE_PROJECT_SUCCESS,
  options,
});

export const shareProjectFail = (error, options) => ({
  type: SHARE_PROJECT_FAIL,
  options,
  error,
});
