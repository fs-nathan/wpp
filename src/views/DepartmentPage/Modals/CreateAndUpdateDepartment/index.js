import React from 'react';
import LogoModal from '../LogoManager';
import { createRoom } from '../../../../actions/room/createRoom';
import { updateRoom } from '../../../../actions/room/updateRoom';
import { connect } from 'react-redux';
import { get } from 'lodash';
import CreateAndUpdateDepartmentPresenter from './presenters';

function CreateAndUpdateDepartment({ 
  updateDepartment = null, 
  open, setOpen, 
  doCreateRoom, doUpdateRoom 
}) {

  const [openLogoModal, setOpenLogoModal] = React.useState(false);
  const [logoProps, setLogoProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'LOGO': {
        setLogoProps(props);
        setOpenLogoModal(true);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <CreateAndUpdateDepartmentPresenter
        updateDepartment={updateDepartment}
        open={open} setOpen={setOpen}
        handleCreateOrUpdateRoom={(name, description, icon) => 
          updateDepartment
            ? doUpdateRoom({
              roomId: get(updateDepartment, 'id'),
              name,
              description,
              icon,
            })
            : doCreateRoom({
              name,
              description,
              icon,
            })
        }
        handleOpenModal={doOpenModal}
      />
      <LogoModal 
        open={openLogoModal}
        setOpen={setOpenLogoModal}
        {...logoProps}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateRoom: ({ name, icon, description }) => dispatch(createRoom({ name, icon, description })),
    doUpdateRoom: ({ roomId, name, icon, description }) => dispatch(updateRoom({ roomId, name, icon, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateAndUpdateDepartment);
