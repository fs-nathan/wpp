import { createProjectGroup } from 'actions/projectGroup/createProjectGroup';
import { detailProjectGroup } from 'actions/projectGroup/detailProjectGroup';
import { editProjectGroup } from 'actions/projectGroup/editProjectGroup';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get, map } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LogoManagerModal from '../../../DepartmentPage/Modals/LogoManager';
import CreateProjectGroupPresenter from './presenters';

function CreateProjectGroup({
  updatedProjectGroup = null,
  open, setOpen,
  doCreateProjectGroup, doEditProjectGroup,
  doReloadList, doReloadDetail,
}) {

  const [openLogo, setOpenLogo] = React.useState(false);
  const [logoProps, setLogoProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'LOGO': {
        setOpenLogo(true);
        setLogoProps(props);
        return;
      }
      default: return;
    }
  }
  return (
    <>
      <CreateProjectGroupPresenter
        updatedProjectGroup={updatedProjectGroup}
        doReloadDetail={() => doReloadDetail({ projectGroupId: get(updatedProjectGroup, 'id') })}
        doReloadList={() => doReloadList()}
        open={open} setOpen={setOpen}
        handleCreateOrEditProjectGroup={(name, description, icon, workingTypes) =>
          updatedProjectGroup
            ? doEditProjectGroup({
              projectGroupId: get(updatedProjectGroup, 'id'),
              name,
              description,
              icon: icon.url_sort,
              work_types: map(workingTypes.filter((item) => item.checked === true), (item) => item.value)
            })
            : doCreateProjectGroup({
              name,
              description,
              icon: icon.url_sort,
              work_types: map(workingTypes.filter((item) => item.checked === true), (item) => item.value)
            })
        }
        handleOpenModal={doOpenModal}
      />
      <LogoManagerModal
        open={openLogo}
        setOpen={setOpenLogo}
        {...logoProps}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadList: () => dispatch(listProjectGroup(true)),
    doReloadDetail: ({ projectGroupId }) => dispatch(detailProjectGroup({ projectGroupId }, true)),
    doCreateProjectGroup: ({ name, icon, description, work_types }) => dispatch(createProjectGroup({ name, icon, description, work_types })),
    doEditProjectGroup: ({ projectGroupId, name, icon, description, work_types }) => dispatch(editProjectGroup({ projectGroupId, name, icon, description, work_types })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateProjectGroup);
