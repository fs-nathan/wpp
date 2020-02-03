import React, { Component } from 'react';
import { mdiAccountCircle } from '@mdi/js';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import DateFnsUtils from '@date-io/date-fns';
import Icon from '@mdi/react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import { actionUpdateProfile } from '../../../../actions/account';
import {
  getProfileService,
  actionGetProfile,
  actionGetFormatDate
} from '../../../../actions/system/system';
import ImageCropper from '../../../../components/ImageCropper/ImageCropper';

import './SettingAccountRight.scss';

class SettingInfo extends Component {
  state = {
    mode: 'view',
    visibleCropModal: false,
    fileUpload: null,
    avatar: null,
    showInputFile: true,
    data: this.props.profile,
    selectedDate: this.props.profile.birthday
      ? new Date(this.props.profile.birthday)
      : new Date(),
    formatDate: 'dd/MM/yyyy'
  };
  componentDidMount() {
    this.getFormatDate();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile && this.props.profile) {
      this.setState({ selectedDate: new Date(this.props.profile.birthday) });
    }
  }
  getFormatDate = async () => {
    try {
      const { data } = await actionGetFormatDate();
      const listDate = data.data || [];
      const formatDate = listDate.find(item => item.selected === true);
      formatDate.replace(/DD/g, 'dd').replace(/YYYY/g, 'yyyyy');
      this.setState({ formatDate: formatDate.date_format });
    } catch (error) {}
  };
  handleChangeStatus = async () => {
    if (this.state.mode === 'view') {
      this.setState({ mode: 'edit' });
    } else if (this.state.mode === 'edit') {
      this.handleChangeProfile();
    }
  };
  handleChangeProfile = async type => {
    try {
      const file = new File([this.state.avatar], 'filename');
      let formData = new FormData();
      if (type === 'updateImage') {
        formData.append('image', file);
      }
      formData.append('name', this.state.data.name);
      formData.append('email', this.state.data.email);
      formData.append('avatar', this.state.data.avatar);
      formData.append('gender', this.state.data.gender);
      formData.append('phone', this.state.data.phone);
      formData.append(
        'birthday',
        moment(this.state.selectedDate).format('YYYY-MM-DD')
      );
      formData.append('address', this.state.data.address);
      formData.append('certificate', this.state.data.certificate);
      formData.append('description', this.state.data.description);
      formData.append('job', this.state.data.job);
      formData.append('order_user_id', this.state.data.order_user_id);
      formData.append('order_storage_id', this.state.data.order_storage_id);
      formData.append('type', this.state.data.type);
      formData.append('gender_name', this.state.data.gender_name);

      await actionUpdateProfile(formData);
      const { data } = await getProfileService();
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: 'view' });
    } catch (error) {
      const { data } = await getProfileService();
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: 'view' });
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.profile
    });
  }
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
    this.setState(
      () => {
        return {
          avatar: image
        };
      },
      () => this.handleChangeProfile('updateImage')
    );
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
      selectedDate,
      formatDate
    } = this.state;
    console.log('selectedDate', selectedDate);
    return (
      <div className="setting-info">
        <div className="content-setting-info">
          <div className="avatar-content-setting-info">
            {this.props.profile.avatar ? (
              <img
                alt=""
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : this.props.profile.avatar
                }
                className="img-avatar"
              />
            ) : (
              <Icon path={mdiAccountCircle} size="120px" color="#ededed" />
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
                value={data.email}
                disabled={true}
                onChange={e => this.handleChangeData('email', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Loại tài khoản</div>
              <div className="value-item-info col-sm-9">
                <Chip size="small" label={data.type} className="type-account" />
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
                    format={formatDate}
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
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
                value={data.gender_name}
                disabled={mode !== 'edit'}
                onChange={e =>
                  this.handleChangeData('gender_name', e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Điện thoại</div>
              <InputBase
                type="number"
                className="value-item-info col-sm-9 phone-infor"
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
                value={data.job}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('job', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">Thông tin khác</div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.description}
                disabled={mode !== 'edit'}
                onChange={e =>
                  this.handleChangeData('description', e.target.value)
                }
              />
            </div>
            <div className="btn-edit-info">
              <Button
                variant="contained"
                className="btn-action none-boxshadow"
                onClick={this.handleChangeStatus}
              >
                {mode === 'view' ? 'Cập nhập' : 'Lưu'}
              </Button>
              {mode === 'edit' && (
                <Button
                  variant="contained"
                  className="btn-action cancel-btn none-boxshadow"
                  onClick={() =>
                    this.setState({
                      mode: 'view',
                      data: { ...this.props.profile }
                    })
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

export default connect(
  state => ({
    profile: state.system.profile
  }),
  {
    actionGetProfile
  }
)(SettingInfo);
