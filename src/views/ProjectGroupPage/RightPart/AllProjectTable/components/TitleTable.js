import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { get } from "lodash-es";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PopoverSetGroupDefault from "views/ProjectGroupPage/components/PopoverSetGroupDefault";

export const TitleTable = ({
  currentGroup,
  typeData,
  expand,
  onExpand = () => {},
  isAllGroup = false,
}) => {
  const { t } = useTranslation();
  const isAllProjects = !!!currentGroup?.name;
  const groupName = get(currentGroup, "name", t("LABEL_WORKING_GROUP"));

  const refSetGroupDefault = useRef(null);

  const _handleOpenSetGroup = (event) => {
    refSetGroupDefault.current._open(event.currentTarget, currentGroup);
  };

  const _renderIconExpand = (event) => {
    return (
      <Icon
        path={mdiMenu}
        size={1}
        fill="#666"
        style={{ marginRight: 10, cursor: "pointer" }}
        onClick={() => onExpand(!expand)}
      />
    );
  };

  const _renderTitleRecently = () => (
    <div
      className={`view_ProjectGroup_Table_All_titleTop ${
        isAllGroup ? "is-all-group" : ""
      }`}
    >
      {_renderIconExpand()}
      <span>{t("LABEL_SEE_RECENTLY")}</span>
    </div>
  );

  const _renderTitlePersonal = () => (
    <div
      className={`view_ProjectGroup_Table_All_titleTop ${
        isAllGroup ? "is-all-group" : ""
      }
  `}
    >
      {_renderIconExpand()}
      <span>{t("LABEL_PERSONAL_BOARD")}</span>
    </div>
  );

  const _renderTitleAllProject = () => (
    <div
      className={`view_ProjectGroup_Table_All_titleTop ${
        isAllGroup ? "is-all-group" : ""
      }
`}
    >
      {_renderIconExpand()}
      {!isAllProjects && (
        <img
          src={get(currentGroup, "icon")}
          style={{ marginRight: 10 }}
          alt={get(currentGroup, "name")}
          width={35}
          height={35}
        />
      )}
      <div style={{ display: "flex" }}>
        <abbr title={groupName}>{groupName}</abbr>
        {!isAllProjects && (
          <>
            <div className="wp-wrapper-button" style={{ marginLeft: 10 }}>
              <KeyboardArrowDownIcon
                sx={{ cursor: "pointer", color: "#666" }}
                onClick={_handleOpenSetGroup}
              />
            </div>

            <DefaultGroupIcon idGroup={get(currentGroup, "id")} />
          </>
        )}
      </div>
      {!isAllProjects && <PopoverSetGroupDefault ref={refSetGroupDefault} />}
    </div>
  );

  function resolveTitle() {
    switch (typeData) {
      case 1:
        return _renderTitleRecently();
      case 2:
        return _renderTitlePersonal();
      default:
        return _renderTitleAllProject();
    }
  }

  return <>{resolveTitle()}</>;
};

const DefaultGroupIcon = ({ idGroup = "" }) => {
  const idGroupDefault = useSelector(
    ({ groupTask }) => groupTask.defaultGroupTask.data || ""
  );
  const idGroupDefaultLocal = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );

  if (
    idGroupDefault === `?groupID=${idGroup}` ||
    `?groupID=${idGroup}` === idGroupDefaultLocal
  ) {
    return (
      <div className="wp-wrapper-button">
        <FlagOutlinedIcon style={{ color: "#666" }} />
      </div>
    );
  }

  return null;
};
