import { detailRoom } from 'actions/room/detailRoom';
import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { listRoom } from 'actions/room/listRoom';
import { banUserFromGroup } from 'actions/user/banUserFromGroup';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import BanUserPresenter from './presenters';

function BanUser({
  roomId = null,
  selectedUser = null,
  open, setOpen,
  doBanUserFromGroup,
  doReloadList, doReloadDetail,
}) {

  return (
    <BanUserPresenter
      doReloadRoom={() =>
        roomId
          ? doReloadDetail({
            roomId,
          })
          : doReloadList()
      }
      open={open} setOpen={setOpen}
      roomId={roomId}
      handleBanUserFromGroup={() =>
        doBanUserFromGroup({
          userId: get(selectedUser, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadDetail: ({ roomId }) => {
      dispatch(detailRoom({ roomId }, true));
      dispatch(getUserOfRoom({ roomId }, true));
    },
    doReloadList: () => {
      dispatch(listRoom(true));
      dispatch(listUserOfGroup(true));
    },
    doBanUserFromGroup: ({ userId }) => dispatch(banUserFromGroup({ userId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(BanUser);
