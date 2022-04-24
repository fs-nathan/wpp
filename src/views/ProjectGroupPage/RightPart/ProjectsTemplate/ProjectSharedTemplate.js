import { Breadcrumbs, Divider, Icon, Link, Typography } from "@mui/material";
import { getListTemplateMeShared } from "actions/project/getListTemplateMeShared";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProjectTemplateWrapper from ".";
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
    <ProjectTemplateWrapper>
      {templates && (
        <div>
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
                <Typography color="text.primary">Đã chia sẻ</Typography>
              </Breadcrumbs>
            </div>
            <div style={{ width: 300 }}>
              <SearchBar />
            </div>
          </div>

          <TemplateSection
            icon={<img src="/images/mau-da-chia-se.png" />}
            templates={templates}
            title="Các mẫu đã chia sẻ"
          />
        </div>
      )}
    </ProjectTemplateWrapper>
  );
};

export default ProjectSharedTemplate;
