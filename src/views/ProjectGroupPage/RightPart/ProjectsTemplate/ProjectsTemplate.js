import { AutoComplete, Input } from "antd";
import { SUGGESTION } from "mocks/suggestion";
import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TemplateGroup from "./components/TemplateGroup/TemplateGroup";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import TemplateSection from "./components/TemplateSection/TemplateSection";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Button } from "@mui/material";
import { TEMPLATE_GROUP } from "mocks/template-group";
import SearchBar from "./components/SearchBar/SearchBar";
import { getTemplateCategory } from "actions/project/getTemplateCategory";
import { useDispatch, useSelector } from "react-redux";
import { getListTemplateMeShared } from "actions/project/getListTemplateMeShared";
import ProjectTemplateWrapper from ".";
import { getNewestTemplate } from "actions/project/getNewestTemplate";

const ProjectsTemplate = () => {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.project.getListTemplate.data);
  const templates = useSelector(
    (state) => state.project.getNewestTemplate.data
  );

  const fetchData = useCallback(async () => {
    try {
      dispatch(getNewestTemplate());
    } catch (error) {}
  }, [dispatch, getNewestTemplate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ProjectTemplateWrapper>
      <div>
        <div className="project-template-page__header">
          <h1>Nhóm mẫu nổi bật</h1>
          <div style={{ width: 300 }}>
            <SearchBar
              handleOnSearch={handleOnSearch}
              handleOnHover={handleOnHover}
              handleOnSelect={handleOnSelect}
              handleOnFocus={handleOnFocus}
            />
          </div>
        </div>

        {/*Content*/}
        <div className="template-group__container">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <TemplateGroup
                key={category.category_id}
                thumbnail={category.category_image}
                title={category.category_name}
              />
            ))}
        </div>

        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={templates}
        />

        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <TemplateSection
              key={category.category_id}
              categoryId={category.category_image}
              icon={<AcUnitIcon fontSize="large" />}
              title={category.category_name}
              templates={category.templates}
              extra={
                <Button
                  variant="text"
                  sx={{
                    color: "#969ead",
                    backgroundColor: "#fafbfc",
                    textTransform: "initial",
                  }}
                >
                  Thêm mẫu cho {category.category_name}
                </Button>
              }
            />
          ))}
      </div>
    </ProjectTemplateWrapper>
  );
};

export default ProjectsTemplate;
