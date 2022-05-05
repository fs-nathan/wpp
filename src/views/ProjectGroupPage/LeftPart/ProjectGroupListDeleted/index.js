import { filter, get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import CreateProjectGroup from "../../Modals/CreateProjectGroup";
import { viewPermissionsSelector } from "../../selectors";
import ProjectGroupListPresenter from "./presenters";
import { groupsSelector } from "./selectors";
import { listProjectGroupDeleted } from "../../../../actions/projectGroup/listProjectGroupDeleted";
import {
  CustomEventDispose,
  CustomEventListener,
  RESTORE_TRASH_PROJECT,
} from "../../../../constants/events";

function ProjectListDeleted({
  groups,
  viewPermissions,
  doListProjectGroupDeleted,
}) {
  React.useEffect(() => {
    doListProjectGroupDeleted(true);
    const reloadList = () => {
      doListProjectGroupDeleted(true);
    };
    CustomEventListener(RESTORE_TRASH_PROJECT, reloadList);
    return () => {
      CustomEventDispose(RESTORE_TRASH_PROJECT, reloadList);
    };
  }, []);
  const [searchPattern, setSearchPattern] = React.useState("");
  const newGroups = {
    ...groups,
    groups: filter(groups.groups, (projectGroup) =>
      get(projectGroup, "name", "")
        .toLowerCase()
        .includes(searchPattern.toLowerCase())
    ),
  };
  const [openCreate, setOpenCreate] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case "CREATE": {
        if (get(viewPermissions.permissions, "manage_group_project", false)) {
          setOpenCreate(true);
        }
        return;
      }
      default:
        return;
    }
  }

  return (
    <>
      <ProjectGroupListPresenter
        groups={newGroups}
        canModify={get(
          viewPermissions.permissions,
          "manage_group_project",
          false
        )}
        searchPattern={searchPattern}
        setSearchPattern={setSearchPattern}
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup open={openCreate} setOpen={setOpenCreate} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    groups: groupsSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doListProjectGroupDeleted: (quite) =>
      dispatch(listProjectGroupDeleted(quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListDeleted);
