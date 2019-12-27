import React, { Component } from 'react';
import { mdiAccountCircle } from '@mdi/js';
import Chip from '@material-ui/core/Chip';
import DateFnsUtils from '@date-io/date-fns';
import Icon from '@mdi/react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import ImageCropper from '../../../../components/ImageCropper/ImageCropper';

import './SettingAccountRight.scss';

const temp = {
  account: 'huuthanhxd@gmail.com',
  name: 'Nguyễn Hữu Thành',
  address: 'Định Công, Hoàng Mai, Hà Nội',
  infoOther: 'Không có',
  phone: '09818006181',
  career: 'Kỹ sư',
  certificate: 'Đại học',
  sex: 'Nam',
  birthday: '15/08/2019'
};
class SettingInfo extends Component {
  state = {
    mode: 'view',
    visibleCropModal: false,
    fileUpload: null,
    avatar: null,
    showInputFile: true,
    data: { ...temp },
    selectedDate: new Date()
  };
  handleChangeStatus = () => {
    if (this.state.mode === 'view') {
      this.setState({ mode: 'edit' });
    } else if (this.state.mode === 'edit') {
      this.setState({ mode: 'view' });
    }
  };
  handleChangeData = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };
  handleUploadFile = e => {
    const file = e.target.files[0];
    this.setState({ showInputFile: false });
    if (file) {
      this.setState({ visibleCropModal: true, fileUpload: file });
    }
    // reset input file
    setTimeout(() => {
      this.setState({ showInputFile: true });
    }, 0);
  };
  handleCropImage = (image, type) => {
    this.setState({ avatar: image });
  };
  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };
  render() {
    const {
      mode,
      data,
      visibleCropModal,
      fileUpload,
      showInputFile,
      avatar,
      selectedDate
    } = this.state;
    return (
      <div className="setting-info">
        <div className="content-setting-info">
          <div className="avatar-content-setting-info">
            {avatar ? (
              <img alt="" src={avatar} className="img-avatar" />
            ) : (
              <Icon path={mdiAccountCircle} size={10} color="#ededed" />
            )}
            {showInputFile && (
              <input
                className="input-file"
                accept="image/*"
                id="raised-button-file"
                type="file"
                onChange={this.handleUploadFile}
              />
            )}
            <Button
              color="primary"
              component="label"
              htmlFor="raised-button-file"
              className="block-change-avatar"
              disableTouchRipple
            >
              Đổi ảnh cá nhân
            </Button>
            <p className="avatar-note-text">(Kích thước: 120x120 px)</p>
          </div>
          <div className="info-content-setting-info ">
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Tài khoản</div>
              <InputBase
                className="value-item-info email col-sm-9"
                value={data.account}
                disabled={true}
                onChange={e => this.handleChangeData('account', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Loại tài khoản</div>
              <div className="value-item-info col-sm-9">
                <Chip size="small" label="Pro" className="type-account" />
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Họ và tên</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.name}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('name', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Ngày sinh</div>
              <div className="value-item-info col-sm-9">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className="value-date-info"
                    disabled={mode !== 'edit'}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Giới tính</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.sex}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('sex', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Điện thoại</div>
              <InputBase
                type="number"
                className="value-item-info col-sm-9"
                value={data.phone}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('phone', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Địa chỉ</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.address}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('address', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Bằng cấp</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.certificate}
                disabled={mode !== 'edit'}
                onChange={e =>
                  this.handleChangeData('certificate', e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Ngành nghề</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.career}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('career', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Thông tin khác</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.infoOther}
                disabled={mode !== 'edit'}
                onChange={e =>
                  this.handleChangeData('infoOther', e.target.value)
                }
              />
            </div>
            <div className="btn-edit-info">
              <Button
                variant="contained"
                className="btn-action"
                onClick={this.handleChangeStatus}
              >
                {mode === 'view' ? 'Cập nhập' : 'Lưu'}
              </Button>
              {mode === 'edit' && (
                <Button
                  variant="contained"
                  className="btn-action cancel-btn"
                  onClick={() =>
                    this.setState({ mode: 'view', data: { ...temp } })
                  }
                >
                  Hủy
                </Button>
              )}
            </div>
          </div>
        </div>
        {visibleCropModal && (
          <ImageCropper
            open={visibleCropModal}
            setOpen={val => this.setState({ visibleCropModal: val })}
            cropType="LOGO"
            image={fileUpload}
            uploadImage={this.handleCropImage}
          />
        )}
      </div>
    );
  }
}

export default SettingInfo;
