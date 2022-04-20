import { Breadcrumbs, Divider, Icon, Link, Typography } from "@mui/material";
import { getListTemplateMeShared } from "actions/project/getListTemplateMeShared";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import TemplateSection from "./components/TemplateSection/TemplateSection";

const ProjectSharedTemplate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const templates = useSelector(
    (state) => state.project.getListTemplateMeShared.data
  );

  const fetchData = useCallback(async () => {
    await dispatch(getListTemplateMeShared());
  }, [dispatch, getListTemplateMeShared]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleClick() {}

  return (
    <>
      {templates && (
        <div className="project-single-template__wrapper">
          <div className="project-single-template">
            <div className="project-single-template__header">
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/projects/template"
                  >
                    Thư viện mẫu
                  </Link>
                  {/* <Typography color="text.primary">
                    {currentCategory && currentCategory.name}
                  </Typography> */}
                </Breadcrumbs>
              </div>
              <div style={{ width: 300 }}>
                <SearchBar />
              </div>
            </div>

            <div className="project-group-template">
              <div className="project-group-template__overview">
                <div className="template-group__section__card">
                  {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSharedTemplate;
