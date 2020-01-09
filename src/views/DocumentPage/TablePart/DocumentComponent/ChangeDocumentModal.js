import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { isEmpty } from '../../../../helpers/utils/isEmpty';

const ChangeDocumentModal = props => {
  const [value, setValue] = useState(props.item.name);
  const handleUpdate = async () => {
    props.onOk(value);
  };
  const handleChangeText = value => {
    setValue(value);
  };
  return (
    <ModalCommon
      title="Đổi tên tài liệu"
      onClose={props.onClose}
      footerAction={[
        {
          name: 'Cập nhật',
          action: handleUpdate,
          disabled: isEmpty(value.trim())
        }
      ]}
    >
      <DialogContent dividers className="dialog-content">
        <TextField
          value={value}
          variant="outlined"
          id="standard-full-width"
          label="Tên tài liệu"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          onChange={event => handleChangeText(event.target.value)}
        />
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(ChangeDocumentModal);
