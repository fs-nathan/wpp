import { createRoom } from 'actions/room/createRoom';
import { detailRoom } from 'actions/room/detailRoom';
import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { listRoom } from 'actions/room/listRoom';
import { updateRoom } from 'actions/room/updateRoom';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LogoModal from '../LogoManager';
import CreateAndUpdateDepartmentPresenter from './presenters';

function CreateAndUpdateDepartment({
  updateDepartment = null,
  open, setOpen,
  doCreateRoom, doUpdateRoom,
  doReloadList, doReloadDetail,
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
        doReloadRoom={() =>
          updateDepartment
            ? doReloadDetail({
              roomId: get(updateDepartment, 'id'),
            })
            : doReloadList()
        }
        open={open} setOpen={setOpen}
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
    doReloadList: () => {
      dispatch(listRoom(true));
      dispatch(listUserOfGroup(true));
    },
    doReloadDetail: ({ roomId }) => {
      dispatch(detailRoom({ roomId }, true));
      dispatch(getUserOfRoom({ roomId }, true));
    },
    doCreateRoom: ({ name, icon, description }) => dispatch(createRoom({ name, icon, description })),
    doUpdateRoom: ({ roomId, name, icon, description }) => dispatch(updateRoom({ roomId, name, icon, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateAndUpdateDepartment);
