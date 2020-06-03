import { deleteDocumentsUser } from 'actions/user/deleteDocumentsUser';
import { detailUser } from 'actions/user/detailUser';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DeleteDocumentPresenter from './presenters';

function DeleteDocument({
  curDocument = null,
  curUser = null,
  open, setOpen,
  doDeleteDocument,
  doReloadUser,
}) {

  return (
    <DeleteDocumentPresenter
      doReloadUser={() => doReloadUser({
        userId: get(curUser, 'id'),
      })}
      curUser={curUser}
      open={open} setOpen={setOpen}
      handleDeleteDocument={() =>
        doDeleteDocument({
          userId: get(curUser, 'id'),
          fileId: get(curDocument, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadUser: ({ userId }) => dispatch(detailUser({ userId })),
    doDeleteDocument: ({ userId, fileId }) => dispatch(deleteDocumentsUser({ userId, fileId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(DeleteDocument);
