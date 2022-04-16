import { SUGGESTION } from "mocks/suggestion";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
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

const SearchBar = ({
  handleOnSearch,
  handleOnHover,
  handleOnSelect,
  handleOnFocus,
}) => {
  const formatResult = (item) => {
    return <Suggestion item={item} />;
  };
  return (
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
        zIndex: 100,
      }}
    />
  );
};

export default SearchBar;
