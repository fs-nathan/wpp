import { listLevel } from 'actions/level/listLevel';
import { listMajor } from 'actions/major/listMajor';
import { listPosition } from 'actions/position/listPosition';
import { listRoom } from 'actions/room/listRoom';
import { detailUser } from 'actions/user/detailUser';
import { uploadDocumentsUser } from 'actions/user/uploadDocumentsUser';
import { CustomEventDispose, CustomEventListener, UPLOAD_DOCUMENTS_USER } from 'constants/events';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpdateUserModal from '../../Modals/UpdateUser';
import UserDocumentModal from '../../Modals/UserDocument';
import { viewPermissionsSelector } from '../../selectors';
import UserInfoPresenter from './presenters';
import { isUploadSelector, userSelector } from './selectors';

function UserInfo({
  user, isUpload, viewPermissions,
  doUploadDocumentsUser,
  doListRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doDetailUser,
}) {

  React.useEffect(() => {
    doListRoom();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListPosition();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListMajor();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListLevel();
    // eslint-disable-next-line
  }, []);

  const { userId } = useParams();
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setId(userId);
  }, [userId]);

  React.useEffect(() => {
    if (id !== null) {
      doDetailUser({ userId: id });
      const reloadDetailUserHandler = () => doDetailUser({ userId });
      CustomEventListener(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
      return () => {
        CustomEventDispose(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  const [openDocuments, setOpenDocuments] = React.useState(false);
  const [documentsProps, setDocumentsProps] = React.useState({});
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenUpdate(true);
          setUpdateProps(props);
        }
        return;
      }
      case 'DOCUMENT': {
        setOpenDocuments(true);
        setDocumentsProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <UserInfoPresenter
        canModify={get(viewPermissions.permissions, 'can_modify', false)}
        user={user} isUpload={isUpload}
        handleUploadDocumentsUser={file => doUploadDocumentsUser({ userId, file })}
        handleOpenModal={doOpenModal}
      />
      <UserDocumentModal open={openDocuments} setOpen={setOpenDocuments} {...documentsProps} />
      <UpdateUserModal open={openUpdate} setOpen={setOpenUpdate} {...updateProps} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    isUpload: isUploadSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
    doUploadDocumentsUser: ({ userId, file }) => dispatch(uploadDocumentsUser({ userId, file })),
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
