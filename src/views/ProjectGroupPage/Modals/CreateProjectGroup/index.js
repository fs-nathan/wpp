import { createProjectGroup } from "actions/projectGroup/createProjectGroup";
import { detailProjectGroup } from "actions/projectGroup/detailProjectGroup";
import { editProjectGroup } from "actions/projectGroup/editProjectGroup";
import { listProjectGroup } from "actions/projectGroup/listProjectGroup";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import LogoManagerModal, {
  LogoManagerContainer,
} from "../../../DepartmentPage/Modals/LogoManager";
import ColorGroupPickerModal from "../ColorGroupPickerModal";
import CreateProjectGroupPresenter from "./presenters";

function CreateProjectGroup({
  updatedProjectGroup = null,
  open,
  setOpen,
  doCreateProjectGroup,
  doEditProjectGroup,
  doReloadList,
  doReloadDetail,
}) {
  const [openLogo, setOpenLogo] = React.useState(false);
  const [logoProps, setLogoProps] = React.useState({});
  const [openColorPickerGroup, setOpenColorPickerGroup] = React.useState(false);
  const [colorPickerProps, setColorPickerProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case "LOGO": {
        setOpenLogo(true);
        setLogoProps(props);
        return;
      }
      case "COLOR_PICKER": {
        setOpenColorPickerGroup(true);
        setColorPickerProps(props);
        return;
      }
      default:
        return;
    }
  }
  return (
    <>
      <LogoManagerContainer {...logoProps}>
        <CreateProjectGroupPresenter
          updatedProjectGroup={updatedProjectGroup}
          doReloadDetail={() =>
            doReloadDetail({ projectGroupId: get(updatedProjectGroup, "id") })
          }
          doReloadList={() => doReloadList()}
          open={open}
          setOpen={setOpen}
          handleCreateOrEditProjectGroup={(name, description, icon) =>
            updatedProjectGroup
              ? doEditProjectGroup({
                  projectGroupId: get(updatedProjectGroup, "id"),
                  name,
                  description,
                  icon: icon.url_sort,
                })
              : doCreateProjectGroup({
                  name,
                  description,
                  icon: icon.url_sort,
                })
          }
          handleOpenModal={doOpenModal}
        />
      </LogoManagerContainer>
      <LogoManagerModal open={openLogo} setOpen={setOpenLogo} {...logoProps} />
      <ColorGroupPickerModal
        open={openColorPickerGroup}
        setOpen={setOpenColorPickerGroup}
        // projectId={projectId}
        // groupId={selectedGroup}
        // project={project}
        {...colorPickerProps}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doReloadList: () => dispatch(listProjectGroup(true)),
    doReloadDetail: ({ projectGroupId }) =>
      dispatch(detailProjectGroup({ projectGroupId }, true)),
    doCreateProjectGroup: ({ name, icon, description, work_types, color }) =>
      dispatch(
        createProjectGroup({ name, icon, description, work_types, color })
      ),
    doEditProjectGroup: ({
      projectGroupId,
      name,
      icon,
      description,
      work_types,
      color,
    }) =>
      dispatch(
        editProjectGroup({
          projectGroupId,
          name,
          icon,
          description,
          work_types,
          color,
        })
      ),
  };
};

export default connect(null, mapDispatchToProps)(CreateProjectGroup);
