import {
  USE_TEMPLATE,
  USE_TEMPLATE_FAIL,
  USE_TEMPLATE_RESET,
  USE_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/useTemplate";

export const useTemplate = ({
  template_id,
  name,
  day_start,
  project_group_id,
}) => ({
  type: USE_TEMPLATE,
  options: {
    template_id,
    name,
    day_start,
    project_group_id,
  },
});

export const useTemplateSuccess = ({ project }, options) => ({
  type: USE_TEMPLATE_SUCCESS,
  options,
  data: {
    project,
  },
});

export const useTemplateFail = (error, options) => ({
  type: USE_TEMPLATE_FAIL,
  options,
  error,
});

export const useTemplateReset = () => ({
  type: USE_TEMPLATE_RESET,
});
