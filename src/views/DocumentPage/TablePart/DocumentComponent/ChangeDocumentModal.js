import React from 'react';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';

const ChangeDocumentModal = props => {
  const handleUpdate = () => {
    props.onOk();
  };
  return (
    <ModalCommon
      title="Đổi tên tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Cập nhật', action: handleUpdate }]}
    >
      <DialogContent dividers className="dialog-content">
        <TextField
          id="standard-full-width"
          label="Tên tài liệu"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
        />
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(ChangeDocumentModal);
