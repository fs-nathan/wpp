import { Grid } from "@material-ui/core";
import { CustomLayoutContext } from "components/CustomLayout";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AddMemberModal from "views/JobDetailPage/ListPart/ListHeader/AddMemberModal";
import DeleteProjectModal from "views/ProjectGroupPage/Modals/DeleteProject";
import ProjectSettingModal from "views/ProjectGroupPage/Modals/ProjectSetting";
import LeftPart from "./components/LeftPart";
import RightPart from "./components/RightPart";

const DashboardPresenters = ({ project, status = {} }) => {
  const topbar = document.getElementById("project-topbar");
  const { modalSetting, setModalSetting } = useContext(CustomLayoutContext);
  const history = useHistory();
  const [openModalAlert, setOpenModalAlert] = React.useState({
    isOpen: false,
    props: {},
  });
  const [openModalAddMember, setOpenModalAddMember] = React.useState(false);

  const _handleOpenModal = (type, props) => {
    switch (type) {
      case "ALERT":
        setOpenModalAlert({ isOpen: true, alertProps: props });
        return;
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
  const _handleSetOpenAlert = (value) =>
    setModalSetting((prevState) => ({ ...prevState, isOpen: value }));
  const _handleDeleted = (id) => history.replace(`/projects`);

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{
          width: "100%",
          margin: "0",
          overflowY: "scroll",
          maxHeight: `calc(100vh - ${topbar?.clientHeight}px)`,
        }}
      >
        <Grid item xs={7}>
          <LeftPart
            projectInfo={project?.project || {}}
            status={status}
            handleOpenModal={_handleOpenModal}
          />
        </Grid>
        <Grid item xs={5} style={{ padding: 0 }}>
          <RightPart handleOpenModal={_handleOpenModal} />
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

      <DeleteProjectModal
        open={openModalAlert.isOpen}
        setOpen={_handleSetOpenAlert}
        projectGroupId={project?.id}
        selectedProject={project?.project}
        doAfterSuccess={_handleDeleted}
      />
    </div>
  );
};

// const HeaderTableCustom = ({
//   project,
//   memberID,
//   canUpdateProject,
//   disableShowHide,
//   handleOpenModal,
//   handleShowOrHideProject,
//   _exportData,
//   handleExpand,
// }) => {
//   const TableContext = React.useContext(CustomTableContext);
//   return (
//     <HeaderProject
//       project={project.project}
//       valueSearch={get(TableContext?.options, "search.patern", "")}
//       onSearch={(value) =>
//         get(TableContext?.options, "search.onChange", () => null)(value)
//       }
//       hasMemberId={isNil(memberID)}
//       canUpdateProject={canUpdateProject && isNil(memberID)}
//       disableShowHide={disableShowHide}
//       onUpdateMember={() => handleOpenModal("SETTING_MEMBER")}
//       onUpdateTime={() => handleOpenModal("CALENDAR", {})}
//       onUpdateVisible={() => handleShowOrHideProject(project.project)}
//       onUpdateSetting={() =>
//         handleOpenModal("SETTING", {
//           curProject: project.project,
//           canChange: {
//             date: canUpdateProject,
//             copy: canUpdateProject,
//             view: true,
//           },
//         })
//       }
//       onExportData={_exportData}
//       onOpenCreateModal={() => handleOpenModal("MENU_CREATE")}
//       onExpand={handleExpand}
//     />
//   );
// };

export default DashboardPresenters;
