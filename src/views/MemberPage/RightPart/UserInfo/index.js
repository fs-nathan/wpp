import React from 'react';
import { useParams } from 'react-router-dom';
import UserDocumentModal from '../../Modals/UserDocument';
import UpdateUserModal from '../../Modals/UpdateUser';
import { connect } from 'react-redux';
import { detailUser } from '../../../../actions/user/detailUser';
import { uploadDocumentsUser } from '../../../../actions/user/uploadDocumentsUser';
import { Context as MemberPageContext } from '../../index';
import { userSelector, isUploadSelector } from './selectors';
import UserInfoPresenter from './presenters';

function UserInfo({ 
  user, isUpload, 
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
        setOpenUpdate(true);
        setUpdateProps(props);
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
