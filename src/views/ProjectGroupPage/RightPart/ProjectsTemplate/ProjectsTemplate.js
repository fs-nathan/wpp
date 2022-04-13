import { AutoComplete, Input } from "antd";
import { SUGGESTION } from "mocks/suggestion";
import React, { useState } from "react";
import "./index.scss";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TemplateGroup from "./components/TemplateGroup/TemplateGroup";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import TemplateSection from "./components/TemplateSection/TemplateSection";
import AcUnitIcon from "@mui/icons-material/AcUnit";
const searchResult = (query: string) =>
  SUGGESTION.map((suggestion) => {
    // const category = `${query}${idx}`;
    return {
      value: suggestion.id,
      label: (
        <div className="suggestion">
          <div className="suggestion__image">
            <img src={suggestion.thumbnail} alt="" />
          </div>
          <div className="suggestion__content">
            <h3>{suggestion.title}</h3>
            <p>bởi {suggestion.author}</p>
          </div>
        </div>
      ),
    };
  });

const Suggestion = ({ item }) => {
  return (
    <div className="suggestion">
      <div className="suggestion__image">
        <img src={item.thumbnail} alt="" />
      </div>
      <div className="suggestion__content">
        <h3>{item.title}</h3>
        <p>bởi {item.author}</p>
      </div>
    </div>
  );
};

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

  const formatResult = (item) => {
    return <Suggestion item={item} />;
  };
  return (
    <div className="project-template-page__wrapper">
      <div className="project-template-page">
        <div className="project-template-page__header">
          <h1>Nhóm mẫu nổi bật</h1>
          <div style={{ width: 300 }}>
            <ReactSearchAutocomplete
              items={SUGGESTION}
              showIcon={false}
              resultStringKeyName="title"
              fuseOptions={{ keys: ["title", "author"] }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              formatResult={formatResult}
              placeholder="Tìm mẫu"
              maxResults={5}
              styling={{
                clearIconMargin: "3px 8px 0 0",
                borderRadius: 0,
                boxShadow: "none",
              }}
            />
          </div>
        </div>

        {/*Content*/}
        <div className="template-group__container">
          {new Array(7).fill(0).map(() => (
            <TemplateGroup
              thumbnail="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
              title="Business"
            />
          ))}
        </div>

        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={new Array(3).fill(DETAIL_TEMPLATE)}
        />
        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={new Array(3).fill(DETAIL_TEMPLATE)}
        />
        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={new Array(3).fill(DETAIL_TEMPLATE)}
        />
        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={new Array(3).fill(DETAIL_TEMPLATE)}
        />
        <TemplateSection
          icon={<AcUnitIcon fontSize="large" />}
          title="Mẫu mới chia sẻ"
          templates={new Array(3).fill(DETAIL_TEMPLATE)}
        />
      </div>
    </div>
  );
};

export default ProjectsTemplate;
