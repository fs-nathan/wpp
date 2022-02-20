import { Grid } from "@material-ui/core";
import { CustomTableContext } from "components/CustomTable";
import HeaderProject from "components/HeaderProject";
import { find, get, isNil } from "lodash";
import React from "react";
import ProjectSettingModal from "views/ProjectGroupPage/Modals/ProjectSetting";
import AddMemberModal from "views/JobDetailPage/ListPart/ListHeader/AddMemberModal/index.js";
import LeftPart from "./components/LeftPart";
import RightPart from "./components/RightPart";

const DashboardPresenters = ({
  project,
  memberID,
  canUpdateProject,
  showHidePendings,
  handleExpand,
  status = {},
}) => {
  const disableShowHide = !isNil(
    find(
      showHidePendings.pendings,
      (pending) => pending === get(project.project, "id")
    )
  );

  const [modalSetting, setModalSetting] = React.useState({
    isOpen: false,
    props: {},
  });
  const [openModalAddMember, setOpenModalAddMember] = React.useState(false);

  const _handleOpenModal = (type, props) => {
    console.log("@Pham_Tinh_Console:", type, props);
    switch (type) {
      // case "CREATE":
      //   setOpenCreate(true);
      //   setSelectedGroup(props);
      //   return;
      // case "MENU_CREATE":
      //   setOpenmMenuCreate(true);
      //   setSelectedGroup(props);
      //   return;
      // case "ALERT":
      //   setOpenAlert(true);
      //   setAlertProps(props);
      //   return;
      // case "CALENDAR":
      //   setOpenCalendar(true);
      //   return;
      // case "ADD_MEMBER":
      //   setOpenModalAddMember(true);
      //   return;
      // case "SETTING_MEMBER":
      //   setOpenMemberSetting(true);
      //   return;
      case "SETTING":
        setModalSetting({
          isOpen: true,
          props: { curProject: project?.project },
        });
        return;
      case "ADD_MEMBER":
        setOpenModalAddMember(true);
        return;
      default:
        return;
    }
  };

  const _handleSetOpenSetting = (value) =>
    setModalSetting((prevState) => ({ ...prevState, isOpen: value }));

  return (
    <div>
      <HeaderTableCustom
        project={project}
        memberID={memberID}
        canUpdateProject={canUpdateProject}
        disableShowHide={disableShowHide}
        handleOpenModal={_handleOpenModal}
        handleExpand={handleExpand}
      />

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <LeftPart
            projectInfo={project?.project || {}}
            status={status}
            handleOpenModal={_handleOpenModal}
          />
        </Grid>
        <Grid item xs={5}>
          <RightPart />
        </Grid>
      </Grid>

      {modalSetting.isOpen && (
        <ProjectSettingModal
          open={modalSetting.isOpen}
          setOpen={_handleSetOpenSetting}
          {...modalSetting.props}
        />
      )}

      {openModalAddMember && (
        <AddMemberModal
          isOpen={openModalAddMember}
          setOpen={setOpenModalAddMember}
          task={openModalAddMember}
          members={project?.project?.members || []}
          projectActive={project?.project?.id || null}
        />
      )}
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
