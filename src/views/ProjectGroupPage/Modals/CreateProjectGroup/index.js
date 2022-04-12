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
import { colors } from "../ColorGroupPickerModal";

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
  const [selectedColor, setSelectedColor] = React.useState(
    updatedProjectGroup?.color || null
  );

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

  console.log("selectedColor", selectedColor);
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
          handleCreateOrEditProjectGroup={(name, description, icon, color) =>
            updatedProjectGroup
              ? doEditProjectGroup({
                  projectGroupId: get(updatedProjectGroup, "id"),
                  name,
                  description,
                  icon: icon.url_full,
                  color: color,
                })
              : doCreateProjectGroup({
                  name,
                  description,
                  icon: icon.url_full,
                  color: color,
                })
          }
          handleOpenModal={doOpenModal}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          defaultFirstColor={updatedProjectGroup?.color || colors[0]}
        />
      </LogoManagerContainer>
      <LogoManagerModal open={openLogo} setOpen={setOpenLogo} {...logoProps} />
      <ColorGroupPickerModal
        open={openColorPickerGroup}
        setOpen={setOpenColorPickerGroup}
        handleSelectColor={({ color }) => {
          setSelectedColor(color);
        }}
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
