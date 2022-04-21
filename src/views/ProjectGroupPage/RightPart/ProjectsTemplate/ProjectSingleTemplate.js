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

const ProjectSingleTemplate = () => {
  const history = useHistory();

  const { id: templateId } = useParams();
  const dispatch = useDispatch();
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
  function handleClick() {}

  return (
    <ProjectTemplateWrapper>
      <div>
        <div className="project-single-template__header">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/projects/template">
                Thư viện mẫu
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/projects/group/${DETAIL_TEMPLATE.parent}`}
              >
                {DETAIL_TEMPLATE.parent}
              </Link>
            </Breadcrumbs>
            <Typography color="text.primary">{template.name}</Typography>
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
            <Typography variant="h5" color="black">
              {template.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chia sẻ bởi @{template.user_share_name}
            </Typography>
            <div className="action">
              <div className="copied">
                <ContentCopyRoundedIcon />
                <Typography variant="body2" color="text.secondary">
                  {template.total_use} lần sao chép
                </Typography>
              </div>
              <div className="views">
                <RemoveRedEyeIcon />

                <Typography variant="body2" color="text.secondary">
                  {template.total_view} lượt xem
                </Typography>
              </div>
            </div>
          </div>
          <div className="project-single-template__overview__action">
            <SingleAction />
          </div>
        </div>

        <div className="project-single-template__description">
          <Typography variant="h5" color="black">
            Về mẫu này
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: template.description }}></div>
          <Typography variant="h6" color="black">
            <Link href="#" variant="h6" color="inherit" underline="always">
              Xem mẫu
            </Link>
          </Typography>
          <div>
            <Typography variant="h6" color="black ">
              <Link href="#" color="inherit" variant="h6" underline="always">
                Sử dụng mẫu
              </Link>{" "}
              hoặc{" "}
              <Link
                href="/projects/add-new"
                variant="h6"
                color="inherit"
                underline="always"
              >
                Bắt đầu với bảng trống
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </ProjectTemplateWrapper>
  );
};

export default ProjectSingleTemplate;
