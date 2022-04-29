import { Breadcrumbs, Divider, Icon, Link, Typography } from "@mui/material";
import { getListTemplateMeShared } from "actions/project/getListTemplateMeShared";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProjectTemplateWrapper from ".";
import SearchBar from "./components/SearchBar/SearchBar";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import TemplateSection from "./components/TemplateSection/TemplateSection";

const ProjectSharedTemplate = ({ expand, handleExpand }) => {
  const history = useHistory();
  const { t } = useTranslation();
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
                  color="#172b4d"
                  onClick={() => history.push("/projects/template")}
                  // href="/projects/template"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    marign: 0,
                  }}
                >
                  {t("TEMPLATE.Sample")}
                </Link>
                <Typography color="text.primary">
                  {t("TEMPLATE.Shared")}
                </Typography>
              </Breadcrumbs>
            </div>
            <div style={{ width: 300 }}>
              <SearchBar />
            </div>
          </div>

          <TemplateSection
            icon={<img src="/images/mau-da-chia-se.png" />}
            templates={templates}
            title={t("TEMPLATE.Shared template")}
          />
        </div>
      )}
    </ProjectTemplateWrapper>
  );
};

export default ProjectSharedTemplate;
