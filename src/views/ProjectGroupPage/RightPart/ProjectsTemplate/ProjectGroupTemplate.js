import { Breadcrumbs, Divider, Icon, Link, Typography } from "@mui/material";
import { getTemplateByCategory } from "actions/project/getTemplateByCategory";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProjectTemplateWrapper from ".";
import SearchBar from "./components/SearchBar/SearchBar";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import TemplateSection from "./components/TemplateSection/TemplateSection";

const ProjectGroupTemplate = ({ expand, handleOpen }) => {
  const history = useHistory();
  const { groupId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const templates = useSelector(
    (state) => state.project.getTemplateByCategory.data
  );
  const categories = useSelector((state) => state.project.getListTemplate.data);

  const currentCategory = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.find((c) => c.category_id === groupId);
    }
    return null;
  }, [categories, groupId]);

  const fetchData = useCallback(async () => {
    try {
      if (groupId)
        await dispatch(getTemplateByCategory({ category_id: groupId }));
    } catch (error) {}
  }, [groupId, getTemplateByCategory, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);
  function handleClick() {}

  return (
    <ProjectTemplateWrapper>
      {currentCategory && (
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
                  {currentCategory && currentCategory.category_name}
                </Typography>
              </Breadcrumbs>
            </div>
            <div style={{ width: 300 }}>
              <SearchBar />
            </div>
          </div>

          <div className="project-group-template">
            <div className="project-group-template__overview">
              <TemplateSection
                isEmpty
                key={currentCategory.category_id}
                categoryId={currentCategory.category_id}
                templates={templates}
                icon={
                  <div>
                    <img
                      src={currentCategory.category_image}
                      width="70px"
                      height="70px"
                    />
                  </div>
                }
                title={
                  t("TEMPLATE.Templates") + " " + currentCategory.category_name
                }
              />
            </div>

            <Divider />
            <div className="project-group-template__description">
              <div>{t("TEMPLATE.Footer")}</div>
              <div>
                <img
                  src={currentCategory.category_image}
                  alt=""
                  width="120px"
                  height="120px"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ProjectTemplateWrapper>
  );
};

export default ProjectGroupTemplate;
