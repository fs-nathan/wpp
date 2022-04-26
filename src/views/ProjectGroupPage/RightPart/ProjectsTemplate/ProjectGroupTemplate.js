import { Breadcrumbs, Divider, Icon, Link, Typography } from "@mui/material";
import { getTemplateByCategory } from "actions/project/getTemplateByCategory";
import React, { useCallback, useEffect, useMemo } from "react";
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
                  Thư viện mẫu
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
                title={"Các mẫu " + currentCategory.category_name}
              />
            </div>

            <Divider />
            <div className="project-group-template__description">
              <div>
                Làm việc cùng nhau tốt hơn với các bảng mẫu Workplus được thiết
                kế và chia sẻ bởi các thành viên trong cộng đồng sử dụng
                Workplus. Cho dù bạn là một doanh nhân độc lập xây dựng doanh
                nghiệp của mình từ những bước đầu hoặc bạn mới làm quen với việc
                quản lý công việc theo cách có kế hoạch, Workplus là công cụ
                hoàn hảo để giữ mọi người kết nối với nhau trong sự phát triển
                doanh nghiệp hoặc nhóm của bạn. Sử dụng các mẫu trên Workplus để
                đảm bảo toàn bộ công ty, nhóm luôn được cập nhật về các sáng
                kiến quan trọng; đặt mục tiêu cao và minh bạch hơn; lên kế hoạch
                cho các chủ đề thảo luận. Dù doanh nghiệp của bạn thuộc lĩnh vực
                gì thì bạn cũng có thể lập kế hoạch công việc, tổ chức và hoàn
                thành nó với Workplus!
              </div>
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
