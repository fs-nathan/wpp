import { getListTemplate } from "actions/project/getListTemplate";
import { getTemplateCategory } from "actions/project/getTemplateCategory";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const ProjectTemplateWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const fetchTemplateCategory = useCallback(async () => {
    try {
      dispatch(getTemplateCategory());
      dispatch(getListTemplate());
    } catch (error) {}
  }, [dispatch, getTemplateCategory, getListTemplate]);

  useEffect(() => {
    fetchTemplateCategory();
  }, [fetchTemplateCategory]);

  useEffect(() => {
    localStorage.setItem("WPS_COLLAPSED_DEFAULT", false);
  }, []);

  return (
    <div className="project-template-page__wrapper">
      <div className="project-template-page">{children}</div>
    </div>
  );
};

export default ProjectTemplateWrapper;
