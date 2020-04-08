import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailUser } from '../../../../actions/user/detailUser';
import { uploadDocumentsUser } from '../../../../actions/user/uploadDocumentsUser';
import { Context as MemberPageContext } from '../../index';
import UpdateUserModal from '../../Modals/UpdateUser';
import UserDocumentModal from '../../Modals/UserDocument';
import { viewPermissionsSelector } from '../../selectors';
import UserInfoPresenter from './presenters';
import { isUploadSelector, userSelector } from './selectors';

function UserInfo({
  user, isUpload, viewPermissions,
  doUploadDocumentsUser,
}) {

  const { setUserId } = React.useContext(MemberPageContext);
  const { userId } = useParams();

  React.useEffect(() => {
    setUserId(userId);
  }, [setUserId, userId]);

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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
