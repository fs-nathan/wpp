import { makeStyles } from "@material-ui/core";
import { mdiClose, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, { useState } from "react";

const SearchButton = ({ valueSearch, onSearch = () => {} }) => {
  const classes = useStyles();
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState(valueSearch || "");

  const _toggleSearch = () => {
    setIsExpand(!isExpand);
  };

  const _handleChange = (evt) => {
    onSearch(evt.target.value);
    setValue(evt.target.value);
  };

  const _handleClearSearch = () => {
    setValue("");
    onSearch("");
    setIsExpand(false);
  };

  const _divClick = () => {
    !isExpand && setIsExpand(true);
  };

  return (
    <div
      className={classNames(classes.wrapperButton, { isExpand })}
      onClick={_divClick}
    >
      <Icon path={mdiMagnify} size={1} onClick={_toggleSearch} />
      <input
        type="text"
        className={classes.inputSearch}
        placeholder="Nhập nội dung cần tìm"
        value={value}
        onChange={_handleChange}
      />
      <Icon
        className={classes.buttonClose}
        path={mdiClose}
        size={1}
        onClick={_handleClearSearch}
      />
    </div>
  );
};

const useStyles = makeStyles({
  wrapperButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "#666",
    marginLeft: 10,
    fontWeight: 500,
    padding: "7.75px 9.5px",
    borderRadius: 3,
    transition: "0.5s all ease-in-out",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
    "&.isExpand": {
      width: 230,
      "& $inputSearch": { display: "block" },
      "& $buttonClose": { display: "block" },
    },
    "& $inputSearch": { display: "none" },
    "& $buttonClose": { display: "none" },
  },
  inputSearch: {
    marginLeft: "10px",
    border: 0,
    background: "transparent",
    width: "100%",
    height: "100%",
    outline: "none",
  },
  buttonClose: {},
});

export default React.memo(SearchButton);
