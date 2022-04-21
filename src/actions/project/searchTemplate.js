import {
  SEARCH_TEMPLATE,
  SEARCH_TEMPLATE_FAIL,
  SEARCH_TEMPLATE_SUCCESS,
  SEARCH_TEMPLATE_RESET,
} from "../../constants/actions/project/searchTemplate";

export const searchTemplate = ({ search_data }, quite = false) => ({
  type: SEARCH_TEMPLATE,
  quite,
  options: {
    search_data,
  },
});

export const searchTemplateSuccess = ({ data }, options) => ({
  type: SEARCH_TEMPLATE_SUCCESS,
  options,
  data,
});

export const searchTemplateFail = (error, options) => ({
  type: SEARCH_TEMPLATE_FAIL,
  options,
  error,
});

export const searchTemplateReset = () => ({
  type: SEARCH_TEMPLATE_RESET,
});
