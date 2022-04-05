import { Popover } from "@material-ui/core";
import { IconFactCheck, IconTask } from "components/IconSvg/Verify_check";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
const MenuCreateNew = ({
  setOpenCreateTaskGroup,
  setOpenMenuCreate,
  anchorEl,
  setAnchorEl,
  setOpenCreate,
}) => {
  const opens = Boolean(anchorEl);
  const { t } = useTranslation();
  const id = opens ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={opens}
      anchorEl={anchorEl}
      className="menu-create-new"
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "bottom",
      }}
    >
      <div className="create-work">
        <div
          className="create-work-item"
          onClick={() => {
            setOpenMenuCreate(false);
            setOpenCreate(true);
          }}
        >
          <IconTask /> <span>{t("LABEL_CREATE_WORK")}</span>
        </div>
        <div
          className="create-work-item"
          onClick={() => {
            setOpenMenuCreate(false);
            setOpenCreateTaskGroup(true);
          }}
        >
          <IconFactCheck />
          <span>{t("LABEL_CREATE_WORKING_GROUP")}</span>
        </div>
      </div>
    </Popover>
  );
};

export default MenuCreateNew;
