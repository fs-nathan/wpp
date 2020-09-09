import React, { Component } from 'react';
import { mdiAccountCircle } from '@mdi/js';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import DateFnsUtils from '@date-io/date-fns';
import Icon from '@mdi/react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import {get} from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import {
  actionUpdateProfile,
  actionUpdateAvatar
} from '../../../../actions/account';
import {
  getProfileService,
  actionGetProfile,
  actionToast
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
      ? moment(
          this.props.profile.birthday,
          this.props.profile.format_date
        ).toDate()
      : new Date(),
    loading: false
  };
  componentDidMount() {
    this.getProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile && this.props.profile) {
      this.setState({
        selectedDate: moment(
          this.props.profile.birthday,
          this.props.profile.format_date
        ).toDate()
      });
    }
  }
  getProfile = async () => {
    try {
      const { data } = await getProfileService();
      if (data.data) this.props.actionGetProfile(data.data);
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
      this.setState({ loading: true });
      const file = new File([this.state.avatar], 'filename');
      let formData = new FormData();
      if (type === 'updateImage') {
        formData.append('image', file);
        await actionUpdateAvatar(formData);
      } else {
        const bodyData = {
          name: this.state.data.name,
          email: this.state.data.email,
          gender: this.state.data.gender,
          phone: this.state.data.phone,
          birthday: moment(this.state.selectedDate).format('YYYY-MM-DD'),
          address: this.state.data.address,
          certificate: this.state.data.certificate,
          description: this.state.data.description,
          job: this.state.data.job,
          order_user_id: this.state.data.order_user_id,
          order_storage_id: this.state.data.order_storage_id,
          type: this.state.data.type
          // gender_name: this.state.data.gender_name
        };
        // formData.append('name', this.state.data.name);
        // formData.append('email', this.state.data.email);
        // formData.append('avatar', this.state.data.avatar);
        // formData.append('gender', this.state.data.gender);
        // formData.append('phone', this.state.data.phone);
        // formData.append(
        //   'birthday',
        //   moment(this.state.selectedDate).format('YYYY-MM-DD')
        // );
        // formData.append('address', this.state.data.address);
        // formData.append('certificate', this.state.data.certificate);
        // formData.append('description', this.state.data.description);
        // formData.append('job', this.state.data.job);
        // formData.append('order_user_id', this.state.data.order_user_id);
        // formData.append('order_storage_id', this.state.data.order_storage_id);
        // formData.append('type', this.state.data.type);
        // formData.append('gender_name', this.state.data.gender_name);
        await actionUpdateProfile(bodyData);
      }

      const { data } = await getProfileService();
      this.handleToast('success', this.props.t('IDS_WP_UPDATE_SUCCESS'));
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: 'view', loading: false });
    } catch (error) {
      this.handleToast('error', this.props.t('IDS_WP_UPDATE_ERROR'));
      const { data } = await getProfileService();
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: 'view', loading: false });
    }
  };
  handleToast = (type, message) => {
    this.props.actionToast(type, message);
    setTimeout(() => this.props.actionToast(null, ''), 2000);
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
    this.setState({ selectedDate: date });
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
      loading
    } = this.state;
    const { t } = this.props;
    const formatDate = this.props.profile.format_date ? 
    this.props.profile.format_date.replace(/DD/g, 'dd').replace(/YYYY/g, 'yyyy') : 'dd/MM/yyyy';
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
              {t('IDS_WP_CHANGE_AVATAR')}
            </Button>
            <p className="avatar-note-text">({t('IDS_WP_SIZE')}: 120x120 px)</p>
          </div>
          <div className="info-content-setting-info ">
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_ACCOUNT')}
              </div>
              <InputBase
                className="value-item-info email col-sm-9"
                value={data.email}
                disabled={true}
                onChange={e => this.handleChangeData('email', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_ACCOUNT_TYPE')}
              </div>
              <div className="value-item-info col-sm-9">
                <Chip size="small" label={data.type} className={get(data.group_active , "is_expire", false) ? "expire-account" : "type-account"} />
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_FULL_NAME')}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.name}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('name', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_BIRTHDAY')}
              </div>
              <div className="value-item-info col-sm-9">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    helperText={''}
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
              <div className="title-item-info col-sm-9 gender-title">
                {t('IDS_WP_GENDER')}
              </div>
              {mode !== 'edit' ? (
                <InputBase
                  className="value-item-info col-sm-3 gender-content"
                  value={
                    data.gender === 1 ? t('IDS_WP_FEMALE') : t('IDS_WP_MALE')
                  }
                  disabled={true}
                />
              ) : (
                <Select
                  native
                  className="value-item-info col-sm-3 gender-content"
                  value={data.gender}
                  onChange={e =>
                    this.handleChangeData('gender', e.target.value)
                  }
                >
                  <option value={1}>{t('IDS_WP_FEMALE')}</option>
                  <option value={0}>{t('IDS_WP_MALE')}</option>
                </Select>
              )}
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_PHONE')}
              </div>
              <InputBase
                type="number"
                className="value-item-info col-sm-9 phone-infor"
                value={data.phone}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('phone', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_ADDRESS')}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.address}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('address', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_CERTIFICATE')}
              </div>
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
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_CAREER')}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.job}
                disabled={mode !== 'edit'}
                onChange={e => this.handleChangeData('job', e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t('IDS_WP_ORTHER_INFO_TEXT')}
              </div>
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
                disabled={loading}
              >
                {loading && (
                  <CircularProgress size={20} className="margin-circular" />
                )}
                {mode === 'view' ? t('IDS_WP_UPDATE') : t('IDS_WP_SAVE')}
              </Button>
              {mode === 'edit' && (
                <Button
                  variant="contained"
                  className="btn-action cancel-btn none-boxshadow"
                  onClick={() =>
                    this.setState({
                      mode: 'view',
                      data: { ...this.props.profile },
                      selectedDate: this.props.profile.birthday
                    })
                  }
                >
                  {t('IDS_WP_CANCEL')}
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
    actionGetProfile,
    actionToast
  }
)(withTranslation()(SettingInfo));
