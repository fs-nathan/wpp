import { SUGGESTION } from "mocks/suggestion";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  searchTemplate,
  searchTemplateReset,
} from "actions/project/searchTemplate";
import { getAllTemplate } from "actions/project/getAllTemplate";
import "./index.scss";
import { template } from "lodash";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";
export const Suggestion = ({ item, onSelect }) => {
  function onClick(event) {
    event.stopPropagation();
    onSelect(item);
  }

  return (
    <div className="suggestion" onClick={onClick}>
      <div className="suggestion__image">
        <img src={item.banner} alt="" />
      </div>
      <div className="suggestion__content">
        <h3>{item.name}</h3>
        <p>bởi {item.user_share_name}</p>
      </div>
    </div>
  );
};

const SearchBar = ({
  handleOnSearch,
  handleOnHover,
  handleOnSelect,
  handleOnFocus,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  // const [isFocus, setIsFocus] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const formatResult = (item) => {
    return <Suggestion item={item} />;
  };

  const [, cancel] = useDebounce(
    () => {
      if (val && val !== "") {
        setIsEmpty(false);
        dispatch(searchTemplate({ search_data: val }));
      } else {
        setIsEmpty(true);
      }
      setDebouncedValue(val);
    },
    300,
    [val]
  );
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.project.searchTemplate.data);
  function onSearch(event) {
    setVal(event.target.value);
  }

  function onSelect(template) {
    history.push(`/projects/template/${template.category_id}/${template.id}`);
    setIsEmpty(true);
    // setIsFocus(false);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={({ currentTarget }) => {
          setVal(currentTarget.value);
        }}
        placeholder={t("TEMPLATE.Find template")}
      />
      <SearchOutlinedIcon
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          color: "#857d7d",
        }}
      />
      {!isEmpty && templates && templates.length > 0 && (
        <div className="search-bar-result">
          {templates.map((item) => (
            <Suggestion
              onSelect={onSelect}
              key={item.id}
              item={item}
            ></Suggestion>
          ))}
        </div>
      )}
    </div>
    // <ReactSearchAutocomplete
    //   items={allItems}
    //   resultStringKeyName="name"
    //   fuseOptions={{ keys: ["name", "user_share_name"] }}
    //   showIcon={false}
    //   onSearch={onSearch}
    //   onSelect={onSelect}
    //   formatResult={formatResult}
    //   placeholder="Tìm mẫu"
    //   maxResults={5}
    //   styling={{
    //     clearIconMargin: "3px 8px 0 0",
    //     borderRadius: 0,
    //     boxShadow: "none",
    //     zIndex: 100,
    //   }}
    // />
  );
};

export default SearchBar;
