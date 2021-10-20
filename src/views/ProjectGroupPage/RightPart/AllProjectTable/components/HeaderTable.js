import { mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";
import Avatar from "components/CustomAvatar";
import NavigatorMenu from "components/NavigatorMenu";
import { DRAWER_TYPE } from "constants/constants";
import { get } from "lodash";
import React from "react";
import "../styles/header-table.scss";

export const HeaderTable = ({ project, handleVisibleDrawerMessage }) => {
  console.log(project);
  return (
    <div className="view_GroupHeader___container">
      <div className="view_GroupHeader___logo">
        <Avatar
          alt="Logo"
          src={get(project, "group_icon", "")}
          style={{ width: 40, height: 40 }}
        />
      </div>
      <div className="view_GroupHeader___info">
        <div
          className="view_GroupHeader___name"
          onClick={() =>
            handleVisibleDrawerMessage({
              type: DRAWER_TYPE.KANBAN.PROJECTS,
              anchor: "left",
              options: {
                projectId: get(project, "id", ""),
              },
            })
          }
        >
          <span>{get(project, "name", "")}</span>
          <Icon path={mdiMenuDown} size={1} />
        </div>
        <NavigatorMenu className="view_GroupHeader___navigation" />
      </div>
    </div>
  );
};
