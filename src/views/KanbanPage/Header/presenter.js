import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import HeaderProject from "components/HeaderProject";
import { DRAWER_TYPE } from "constants/constants";
import React from "react";
import "./style.scss";

const MiniContainer = ({ className = "", ...props }) => (
  <div
    className={`view_KanbanHeader___container-mini ${className}`}
    {...props}
  />
);

function KanbanPage({
  handleVisibleDrawerMessage,
  search,
  handleSearchChange,
  project,
  isOpen,
  setIsOpen,
  handleShowOrHideProject,
  handleOpenModal,
  showHidePendings,
  canUpdate,
  expand,
  onExpand,
}) {
  function handleMoreClick(handler) {
    return (evt) => {
      handler();
    };
  }

  return isOpen ? (
    <>
      <HeaderProject
        project={project}
        view="kanban"
        valueSearch={search}
        onSearch={handleSearchChange}
        expand={expand}
        onExpand={onExpand}
        canUpdateProject={canUpdate}
        onUpdateTime={handleMoreClick(() => handleOpenModal("CALENDAR", {}))}
        onUpdateSetting={handleMoreClick(() =>
          handleOpenModal("SETTING_PROJECT", {
            curProject: project,
          })
        )}
        onOpenFilterKanban={() =>
          handleVisibleDrawerMessage({
            type: DRAWER_TYPE.KANBAN.FILTER,
            anchor: "right",
            options: {},
          })
        }
        onOpenCreateModal={handleMoreClick(() =>
          handleOpenModal("MENU_CREATE", {
            curProject: project,
          })
        )}
        onUpdateMember={handleMoreClick(() =>
          handleOpenModal("MEMBER_SETTING", {})
        )}
        onUpdateVisible={handleMoreClick(() =>
          handleShowOrHideProject(project)
        )}
      />
    </>
  ) : (
    <MiniContainer>
      <Icon path={mdiChevronDown} size={1} onClick={() => setIsOpen(true)} />
    </MiniContainer>
  );
}

export default KanbanPage;
