import { Grid } from "@material-ui/core";
import { CustomTableContext } from "components/CustomTable";
import HeaderProject from "components/HeaderProject";
import { get, isNil, find } from "lodash";
import React from "react";
import LeftPart from "./components/LeftPart";
import RightPart from "./components/RightPart";

const DashboardPresenters = ({
  project,
  memberID,
  canUpdateProject,
  showHidePendings,
  handleExpand,
}) => {
  const disableShowHide = !isNil(
    find(
      showHidePendings.pendings,
      (pending) => pending === get(project.project, "id")
    )
  );

  const handleOpenModal = () => {};

  return (
    <div>
      <HeaderTableCustom
        project={project}
        memberID={memberID}
        canUpdateProject={canUpdateProject}
        disableShowHide={disableShowHide}
        handleOpenModal={handleOpenModal}
        handleExpand={handleExpand}
      />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <LeftPart />
        </Grid>
        <Grid item xs={5}>
          <RightPart />
        </Grid>
      </Grid>
    </div>
  );
};

const HeaderTableCustom = ({
  project,
  memberID,
  canUpdateProject,
  disableShowHide,
  handleOpenModal,
  handleShowOrHideProject,
  _exportData,
  handleExpand,
}) => {
  const TableContext = React.useContext(CustomTableContext);
  return (
    <HeaderProject
      project={project.project}
      valueSearch={get(TableContext?.options, "search.patern", "")}
      onSearch={(value) =>
        get(TableContext?.options, "search.onChange", () => null)(value)
      }
      hasMemberId={isNil(memberID)}
      canUpdateProject={canUpdateProject && isNil(memberID)}
      disableShowHide={disableShowHide}
      onUpdateMember={() => handleOpenModal("SETTING_MEMBER")}
      onUpdateTime={() => handleOpenModal("CALENDAR", {})}
      onUpdateVisible={() => handleShowOrHideProject(project.project)}
      onUpdateSetting={() =>
        handleOpenModal("SETTING", {
          curProject: project.project,
          canChange: {
            date: canUpdateProject,
            copy: canUpdateProject,
            view: true,
          },
        })
      }
      onExportData={_exportData}
      onOpenCreateModal={() => handleOpenModal("MENU_CREATE")}
      onExpand={handleExpand}
    />
  );
};

export default DashboardPresenters;
