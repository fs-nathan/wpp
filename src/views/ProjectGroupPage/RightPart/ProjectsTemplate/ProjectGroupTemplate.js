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

const ProjectGroupTemplate = () => {
  const history = useHistory();
  const { id: groupId } = useParams();
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

  // const fetchData = useCallback(async () => {
  //   try {
  //     if (groupId)
  //       await dispatch(getTemplateByCategory({ category_id: groupId }));
  //   } catch (error) {}
  // }, [groupId, getTemplateByCategory, dispatch]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);
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
                  color="inherit"
                  href="/projects/template"
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
                templates={currentCategory.templates}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                aperiam porro nesciunt explicabo facilis dolores quis rerum odio
                vero iure ducimus tempora at nam obcaecati, natus, architecto
                accusamus, nisi dolor? Vitae quas enim modi tenetur delectus
                architecto ab? Accusantium aspernatur laboriosam numquam
                corrupti minus voluptate ipsum voluptatum recusandae, mollitia
                vitae sapiente eos atque rem sequi quis fugiat natus aperiam
                odio! Voluptates porro quo ex at labore nostrum accusantium,
                temporibus cum minima hic amet ullam fugit laboriosam repellat
                culpa consequatur. Asperiores beatae vel repudiandae voluptate
                natus sapiente fugiat praesentium odit tempore! Quasi voluptas
                quibusdam reiciendis error placeat velit quaerat officiis unde
                repellendus sit architecto beatae cumque rem expedita suscipit
                qui esse itaque illum, commodi repudiandae, obcaecati dolorum
                quis! Nam, consequuntur quasi? Repudiandae ipsa tenetur facilis
                totam? Adipisci omnis molestiae eligendi, necessitatibus
                dignissimos quia
              </div>
              <div>
                <img
                  src={currentCategory.category_image}
                  alt=""
                  width="120px"
                  height="120px"
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
