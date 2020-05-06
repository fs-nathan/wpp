import { createProjectGroup } from 'actions/projectGroup/createProjectGroup';
import { detailProjectGroup } from 'actions/projectGroup/detailProjectGroup';
import { editProjectGroup } from 'actions/projectGroup/editProjectGroup';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get } from 'lodash';
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
        updatedProjectGroup={updatedProjectGroup} doReloadProjectGroup={() =>
          updatedProjectGroup
            ? doReloadDetail({ projectGroupId: get(updatedProjectGroup, 'id') })
            : doReloadList()
        }
        open={open} setOpen={setOpen}
        handleCreateOrEditProjectGroup={(name, description, icon) =>
          updatedProjectGroup
            ? doEditProjectGroup({
              projectGroupId: get(updatedProjectGroup, 'id'),
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
    doCreateProjectGroup: ({ name, icon, description }) => dispatch(createProjectGroup({ name, icon, description })),
    doEditProjectGroup: ({ projectGroupId, name, icon, description }) => dispatch(editProjectGroup({ projectGroupId, name, icon, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateProjectGroup);
