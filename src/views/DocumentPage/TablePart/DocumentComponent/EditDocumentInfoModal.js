import React, { useState } from 'react';
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

const currencies = [
  { value: 'USD', label: 'Chưa phát hành' },
  { value: 'EUR', label: 'Đang phát hành' },
  { value: 'BTC', label: 'Đã phát hành' }
];

const EditDocumentInfoModal = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleUpdate = () => {
    props.onOk();
  };
  return (
    <ModalCommon
      title="Thông tin tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Cập nhật', action: handleUpdate }]}
    >
      <DialogContent dividers className="dialog-content">
        <TextField
          // value={value}
          // variant="outlined"
          id="standard-full-width"
          label="Miêu tả tài liệu"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          // onChange={event => handleChangeText(event.target.value)}
        />
        <TextField
          // value={value}
          // variant="outlined"
          id="standard-full-width"
          label="Ngày phát hành"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          // onChange={event => handleChangeText(event.target.value)}
        />
        <p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Ngày phát hành"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="create-order-title"
            />
          </MuiPickersUtilsProvider>
        </p>

        <TextField
          id="outlined-select-currency-native"
          select
          label="Phiên bản"
          // value={currency}
          // onChange={handleChange}
          fullWidth
          SelectProps={{ native: true }}
          placeholder="Chọn phiên bản"
          // variant="outlined"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          // value={value}
          // variant="outlined"
          id="standard-full-width"
          label="Người soạn tài liệu"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          // onChange={event => handleChangeText(event.target.value)}
        />
        <TextField
          // value={value}
          // variant="outlined"
          id="standard-full-width"
          label="Người ký duyệt"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          // onChange={event => handleChangeText(event.target.value)}
        />
        <TextField
          // value={value}
          // variant="outlined"
          id="standard-full-width"
          label="Nơi lưu trữ"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          // onChange={event => handleChangeText(event.target.value)}
        />
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(EditDocumentInfoModal);
