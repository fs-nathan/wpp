import { makeStyles } from "@material-ui/core";
import { mdiClose, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchButton = ({ valueSearch, onSearch = () => {} }) => {
  const classes = useStyles();
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState(valueSearch || "");
  const { t } = useTranslation();

  const _toggleSearch = () => {
    setIsExpand(!isExpand);
  };

  const _handleChange = (evt) => {
    onSearch(evt.target.value);
    setValue(evt.target.value);
  };

  const _divClick = () => {
    !isExpand && setIsExpand(true);
  };

  return (
    <div
      className={classNames(classes.wrapperButton, "isExpand")}
      onClick={_divClick}
    >
      <input
        type="text"
        className={classes.inputSearch}
        placeholder={t("LABEL_SEARCH")}
        value={value}
        onChange={_handleChange}
      />
      <Icon path={mdiMagnify} size={1} onClick={_toggleSearch} />
    </div>
  );
};

const useStyles = makeStyles({
  wrapperButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#ebedef",
    color: "#adaeba",
    marginLeft: 10,
    fontWeight: 500,
    padding: "10px 12px",
    borderRadius: 3,
    transition: "0.5s all ease-in-out",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
    "&.isExpand": {
      width: 260,
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

    "&::placeholder": {
      color: "#cdcfd0",
      fontSize: '16px'
    },
  },
  buttonClose: {},
});

export default React.memo(SearchButton);
