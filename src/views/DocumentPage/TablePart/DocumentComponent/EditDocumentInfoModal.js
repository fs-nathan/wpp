import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { updateDocumentInfo } from '../../../../actions/documents';

const EditDocumentInfoModal = props => {
  const handleUpdate = async e => {
    // e.preventDefault();
    try {
      const { elements } = e.target;
      const result = {
        file_id: props.item.id,
        description: elements.description.value,
        date_released: elements.date_released.value,
        version: elements.version.value,
        author: elements.author.value,
        user_approved: elements.user_approved.value,
        storage_address: elements.storage_address.value
      };
      console.log('result', result);
      await updateDocumentInfo(result);
      props.getData();
      props.onClose();
    } catch (err) {}
  };
  return (
    <ModalCommon
      title="Thông tin tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Cập nhật', action: handleUpdate }]}
    >
      <DialogContent dividers className="dialog-content">
        <form onSubmit={handleUpdate}>
          <TextField
            id="description"
            label="Miêu tả tài liệu"
            fullWidth
            margin="normal"
            multiline
            rows="2"
            rowsMax="4"
            defaultValue={props.item.description}
            InputLabelProps={{ shrink: true }}
            // inputProps={{ maxLength: 300 }}
            className="create-order-title"
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date_released"
              label="Ngày phát hành"
              // value={selectedDate}
              defaultValue={props.item.date_released || null}
              // onChange={handleDateChange}
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="create-order-title"
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="version"
            label="Phiên bản"
            fullWidth
            margin="normal"
            defaultValue={props.item.version}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="author"
            label="Người soạn tài liệu"
            fullWidth
            margin="normal"
            defaultValue={props.item.author}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="user_approved"
            label="Người ký duyệt"
            fullWidth
            margin="normal"
            defaultValue={props.item.user_approved}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="storage_address"
            label="Nơi lưu trữ"
            fullWidth
            margin="normal"
            defaultValue={props.item.storage_address}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
        </form>
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(EditDocumentInfoModal);
