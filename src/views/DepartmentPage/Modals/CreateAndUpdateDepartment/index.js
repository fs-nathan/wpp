import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { createRoom } from '../../../../actions/room/createRoom';
import { updateRoom } from '../../../../actions/room/updateRoom';
import LogoModal from '../LogoManager';
import CreateAndUpdateDepartmentPresenter from './presenters';
import { actionLoadingSelector } from './selectors';

function CreateAndUpdateDepartment({
  updateDepartment = null,
  open, setOpen, actionLoading,
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
        open={open} setOpen={setOpen} actionLoading={actionLoading}
        handleCreateOrUpdateRoom={(name, description, icon) =>
          updateDepartment
            ? doUpdateRoom({
              roomId: get(updateDepartment, 'id'),
              name,
              description,
              icon: icon.url_sort,
            })
            : doCreateRoom({
              name,
              description,
              icon: icon.url_sort,
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
  state => ({
    actionLoading: actionLoadingSelector(state)
  }
  ),
  mapDispatchToProps,
)(CreateAndUpdateDepartment);
