import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { get } from "lodash-es";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopoverSetGroupDefault from "views/ProjectGroupPage/components/PopoverSetGroupDefault";

export const TitleTable = React.memo(
  ({ currentGroup, typeData, expand, onExpand = () => {} }) => {
    const { t } = useTranslation();
    const isAllProjects = !!!currentGroup?.name;
    const groupName = get(currentGroup, "name", t("LABEL_WORKING_GROUP"));
    const [defaultAccessItem] = useLocalStorage(
      "WPS_WORKING_SPACE_DEFAULT_ACCESS"
    );
    const [isDefaultGroup, setIsDefaultGroup] = useState(
      () => defaultAccessItem === `?groupID=${get(currentGroup, "id")}`
    );
    const refSetGroupDefault = useRef(null);

    const _handleOpenSetGroup = (event) => {
      refSetGroupDefault.current._open(event.currentTarget, currentGroup);
    };

    const _handleSetDefaultGroup = (defaultGroup) => {
      setIsDefaultGroup(defaultGroup === `?groupID=${get(currentGroup, "id")}`);
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
      <div className={"view_ProjectGroup_Table_All_titleTop"}>
        {_renderIconExpand()}
        <span>{t("LABEL_SEE_RECENTLY")}</span>
      </div>
    );

    const _renderTitlePersonal = () => (
      <div className={"view_ProjectGroup_Table_All_titleTop"}>
        {_renderIconExpand()}
        <span>{t("LABEL_PERSONAL_BOARD")}</span>
      </div>
    );

    const _renderTitleAllProject = () => (
      <div className="view_ProjectGroup_Table_All_titleTop">
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

              {isDefaultGroup && (
                <div className="wp-wrapper-button">
                  <FlagOutlinedIcon style={{ color: "#666" }} />
                </div>
              )}
            </>
          )}
        </div>
        {!isAllProjects && (
          <PopoverSetGroupDefault
            ref={refSetGroupDefault}
            onSetDefault={_handleSetDefaultGroup}
          />
        )}
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
  }
);
