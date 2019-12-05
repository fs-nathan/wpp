import React from 'react';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';

const ShareDocumentModal = props => {
  const handleShare = () => {
    props.onOk();
  };
  return (
    <ModalCommon
      title="Chia sẻ tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Hoàn thành', action: handleShare }]}
    >
      <DialogContent dividers className="dialog-content">
        <TextField
          id="standard-full-width"
          label="Chia sẻ tài liệu"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
        />
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(ShareDocumentModal);
