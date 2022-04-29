import { createProjectGroup } from "actions/projectGroup/createProjectGroup";
import { detailProjectGroup } from "actions/projectGroup/detailProjectGroup";
import { editProjectGroup } from "actions/projectGroup/editProjectGroup";
import { listProjectGroup } from "actions/projectGroup/listProjectGroup";
import { get } from "lodash";
import React, { useContext } from "react";
import { connect } from "react-redux";
import LogoManagerModal, {
  LogoManagerContainer,
} from "../../../DepartmentPage/Modals/LogoManager";
import ColorGroupPickerModal from "../ColorGroupPickerModal";
import CreateProjectGroupPresenter from "./presenters";
import { colors } from "../ColorGroupPickerModal";
import { LogoManagerContext } from "views/DepartmentPage/Modals/LogoManager/presenters";

function CreateProjectGroup({
  updatedProjectGroup = null,
  open,
  setOpen,
  doCreateProjectGroup,
  doEditProjectGroup,
  doReloadList,
  doReloadDetail,
}) {
  const { icons } = useContext(LogoManagerContext);

  const [openLogo, setOpenLogo] = React.useState(false);
  const [logoProps, setLogoProps] = React.useState({});
  const [openColorPickerGroup, setOpenColorPickerGroup] = React.useState(false);
  const [colorPickerProps, setColorPickerProps] = React.useState({});
  const [selectedColor, setSelectedColor] = React.useState(
    updatedProjectGroup?.color || colors[0]
  );
  // const [selectedLogo, setSelectedLogo] = React.useState(
  //   updatedProjectGroup?.icon || {
  //     url_full: "",
  //     url_sort: "",
  //   }
  // );

  // React.useEffect(() => {
  //   if (icons) return;
  //   const firstIconDefaults = icons?.defaults[0];
  //   if (selectedLogo?.url_full === "") {
  //     setSelectedLogo({
  //       url_sort: get(firstIconDefaults, "icon"),
  //       url_full: get(firstIconDefaults, "url_icon"),
  //     });
  //   }
  // }, [icons]);

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
          handleCreateOrEditProjectGroup={(name, description, icon, color) => {
            updatedProjectGroup
              ? doEditProjectGroup({
                  projectGroupId: get(updatedProjectGroup, "id"),
                  name,
                  description,
                  icon: icon.url_sort,
                  color: color,
                })
              : doCreateProjectGroup({
                  name,
                  description,
                  icon: icon.url_sort,
                  color: color,
                });
          }}
          handleOpenModal={doOpenModal}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          // selectedLogo={selectedLogo}
          // setSelectedLogo={setSelectedLogo}
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
