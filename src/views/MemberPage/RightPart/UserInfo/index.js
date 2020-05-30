import { listLevel } from 'actions/level/listLevel';
import { listMajor } from 'actions/major/listMajor';
import { listPosition } from 'actions/position/listPosition';
import { listRoom } from 'actions/room/listRoom';
import { detailUser } from 'actions/user/detailUser';
import { uploadDocumentsUser } from 'actions/user/uploadDocumentsUser';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import UpdateUserModal from '../../Modals/UpdateUser';
import UserDocumentModal from '../../Modals/UserDocument';
import { viewPermissionsSelector } from '../../selectors';
import UserInfoPresenter from './presenters';
import { userSelector } from './selectors';

function UserInfo({
  user, viewPermissions,
  doUploadDocumentsUser,
  doListRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doDetailUser,
  doReloadUser,
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

  React.useEffect(() => {
    if (userId !== null) {
      doDetailUser({ userId });
    }
    // eslint-disable-next-line
  }, [userId]);

  const [openDocuments, setOpenDocuments] = React.useState(false);
  const [documentsProps, setDocumentsProps] = React.useState({});
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});
  const [openUpload, setOpenUpload] = React.useState(false);
  const [uploadProps, setUploadProps] = React.useState({});

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
      case 'UPLOAD': {
        setOpenUpload(true);
        setUploadProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <UserInfoPresenter
        canModify={get(viewPermissions.permissions, 'can_modify', false)}
        user={user} userId={userId}
        handleUploadComputerDocumentsUser={files => doUploadDocumentsUser({ userId, files })}
        handleUploadVtaskDocumentsUser={fileIds => doUploadDocumentsUser({ userId, fileIds })}
        handleUploadGoogleDocumentsUser={googleData => doUploadDocumentsUser({ userId, googleData })}
        handleOpenModal={doOpenModal}
        doReloadUser={() => doReloadUser({ userId })}
      />
      <UserDocumentModal open={openDocuments} setOpen={setOpenDocuments} {...documentsProps} />
      <UpdateUserModal open={openUpdate} setOpen={setOpenUpdate} {...updateProps} />
      <SendFileModal open={openUpload} setOpen={setOpenUpload} {...uploadProps} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doReloadUser: ({ userId }) => {
      dispatch(detailUser({ userId }));
    },
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
    doUploadDocumentsUser: ({ userId, files, fileIds, googleData }) => dispatch(uploadDocumentsUser({ userId, files, fileIds, googleData })),
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
