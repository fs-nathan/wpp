import {
  Avatar,
  Breadcrumbs,
  Button,
  Link,
  Popover,
  Typography,
} from "@mui/material";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./index.scss";
import SingleAction from "./components/SingleAction/SingleAction";
import { useDispatch, useSelector } from "react-redux";
import { getDetailTemplate } from "actions/project/getDetailTemplate";
import ProjectTemplateWrapper from ".";
import { SettingsInputSvideo } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const ProjectSingleTemplate = ({ handleOpen }) => {
  const history = useHistory();
  const [isOpenUsing, setIsOpenUsing] = useState(false);
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const template = useSelector((state) => state.project.getDetailTemplate.data);

  const fetchData = useCallback(async () => {
    try {
      if (templateId)
        await dispatch(getDetailTemplate({ template_id: templateId }));
    } catch (error) {}
  }, [templateId, getDetailTemplate, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    handleOpen();
  }, []);
  function handleClick() {}

  function previewTemplate() {
    history.push(
      `/projects/template/${template.category_id}/${templateId}/preview/task-table/${template.project_id}`
    );
  }

  return (
    <ProjectTemplateWrapper>
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
              <Link
                underline="hover"
                color="#172b4d"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  marign: 0,
                }}
                onClick={() =>
                  history.push(`/projects/template/${template.category_id}`)
                }
                // href={`/projects/group/${template.category_id}`}
              >
                {template.category_name}
              </Link>
              <Typography
                color="text.primary"
                style={{
                  cursor: "default",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                }}
              >
                {template.name}
              </Typography>
            </Breadcrumbs>
          </div>
          <div style={{ width: 300 }}>
            <SearchBar />
          </div>
        </div>

        <div className="project-single-template__overview">
          <div className="project-single-template__overview__avatar">
            <Avatar
              alt={template.user_share_name}
              src={template.user_share_avatar}
              sx={{
                width: 72,
                height: 72,
                border: "2px solid white",
              }}
            />
          </div>
          <div className="project-single-template__overview__info">
            <Typography
              variant="h5"
              sx={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: "1",
                color: "#172b4d",
              }}
            >
              {template.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                margin: 0,
                fontSize: "13px",
                fontWeight: "normal",
                lineHeight: "20px",
                color: "#172b4d",
              }}
            >
              {t("TEMPLATE.Shared by")} @{template.user_share_name}
            </Typography>
            <div className="action">
              <div className="copied">
                <ContentCopyRoundedIcon sx={{ fontSize: "13px" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "13px", color: "rgb(107,119,140)" }}
                >
                  {template.total_use} {t("TEMPLATE.copied")}
                </Typography>
              </div>
              <div className="views">
                <RemoveRedEyeIcon sx={{ fontSize: "13px" }} />

                <Typography
                  variant="body2"
                  sx={{ fontSize: "13px", color: "rgb(107,119,140)" }}
                >
                  {template.total_view} {t("TEMPLATE.views")}
                </Typography>
              </div>
            </div>
          </div>
          <div className="project-single-template__overview__action">
            <SingleAction
              isOpenUsing={isOpenUsing}
              closeUsing={() => {
                setIsOpenUsing(false);
              }}
            />
          </div>
        </div>

        <div className="project-single-template__description">
          <Typography
            variant="h5"
            color="black"
            sx={{
              color: "#172b4d",
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "-0.008em",
              lineHeight: "24px",
            }}
          >
            {t("TEMPLATE.About")}
          </Typography>
          <div
            style={{
              color: "#172B4D",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
            dangerouslySetInnerHTML={{ __html: template.description }}
          ></div>
          <Typography variant="h6" color="black">
            <Link
              href="#"
              variant="h6"
              color="inherit"
              underline="always"
              onClick={previewTemplate}
              className="project-single-template__description__link__action"
            >
              {t("TEMPLATE.Preview")}
            </Link>
          </Typography>
          <div>
            <Typography
              variant="h6"
              className="project-single-template__description__link"
            >
              <span onClick={() => setIsOpenUsing(true)}>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="always"
                  className="project-single-template__description__link__action"
                >
                  {t("TEMPLATE.Use")}
                </Link>
              </span>{" "}
              {t("TEMPLATE.Or")}{" "}
              <Link
                href="/projects/add-new"
                variant="h6"
                color="inherit"
                underline="always"
                className="project-single-template__description__link__action"
              >
                {t("TEMPLATE.Start blank")}
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </ProjectTemplateWrapper>
  );
};

export default ProjectSingleTemplate;
