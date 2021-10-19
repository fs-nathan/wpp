import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { mdiChevronDown, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { get } from "lodash-es";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";
import PopoverSetGroupDefault from "views/ProjectGroupPage/components/PopoverSetGroupDefault";

export const TitleTable = ({
  currentGroup,
  typeData,
  expand,
  onExpand = () => {},
}) => {
  const { t } = useTranslation();
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

  function resolveTitle() {
    switch (typeData) {
      case 1:
        return (
          <div className={"view_ProjectGroup_Table_All_titleTop"}>
            {_renderIconExpand()}
            <span>{t("LABEL_SEE_RECENTLY")}</span>
          </div>
        );
      case 2:
        return (
          <div className={"view_ProjectGroup_Table_All_titleTop"}>
            {_renderIconExpand()}
            <span>{t("LABEL_PERSONAL_BOARD")}</span>
          </div>
        );
      default:
        return (
          <div className="view_ProjectGroup_Table_All_titleTop">
            {_renderIconExpand()}
            <abbr title={get(currentGroup, "name", t("LABEL_WORKING_GROUP"))}>
              {get(currentGroup, "name", t("LABEL_WORKING_GROUP"))}
              <Icon
                path={mdiChevronDown}
                size={1}
                fill="#666"
                style={{ margin: "0 10px", cursor: "pointer" }}
                onClick={_handleOpenSetGroup}
              />
              {isDefaultGroup && <FlagOutlinedIcon style={{ color: "#666" }} />}
            </abbr>
            <PopoverSetGroupDefault
              ref={refSetGroupDefault}
              onSetDefault={_handleSetDefaultGroup}
            />
          </div>
        );
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {resolveTitle()}
    </div>
  );
};
