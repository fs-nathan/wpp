import React from 'react';
import LogoManagerModal from '../../../DepartmentPage/Modals/LogoManager';
import { createProjectGroup } from '../../../../actions/projectGroup/createProjectGroup';
import { editProjectGroup } from '../../../../actions/projectGroup/editProjectGroup';
import { connect } from 'react-redux';
import { get } from 'lodash';
import CreateProjectGroupPresenter from './presenters';

function CreateProjectGroup({ 
  updatedProjectGroup = null, 
  open, setOpen, 
  doCreateProjectGroup, doEditProjectGroup 
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
    doCreateProjectGroup: ({ name, icon, description }) => dispatch(createProjectGroup({ name, icon, description })),
    doEditProjectGroup: ({ projectGroupId, name, icon, description }) => dispatch(editProjectGroup({ projectGroupId, name, icon, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateProjectGroup);
