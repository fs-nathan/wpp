import React, { useState, useEffect } from 'react';
import { Button, TextField, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js';
import { connect } from 'react-redux';
import {
  actionFetchGroupDetail,
  actionUpdateLogoGroup,
  actionUpdateCoverGroup,
  actionUpdateGroupInfo
} from '../../../../actions/setting/setting';
import {
  convertBase64ToBlob,
  convertUrlToBlob,
  getProfileService,
  actionGetProfile,
  actionActiveGroup,
  actionToast
} from '../../../../actions/system/system';
import ImageCropper from '../../../../components/ImageCropper/ImageCropper';
import * as images from '../../../../assets';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import LoadingContent from '../../../../components/LoadingContent';
import PickColorModal from './PickColorModal';
import './SettingGroupRight.scss';

const CROP_TYPE = { LOGO: 'LOGO', COVER: 'COVER' };
const Info = props => {
  const { t } = useTranslation();
  const { isLoading, groupDetail } = props;

  const [editMode, setEditMode] = useState(false);
  const [groupInfo, setGroupInfo] = useState({});
  const [showInputFile, setShowInputFile] = useState(true);
  const [visibleCropModal, setVisibleCropModal] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [logoGroup, setLogoGroup] = useState(null);
  const [coverGroup, setCoverGroup] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [updatingImg, setUpdatingImg] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = props;
  const bgColor = colors.find(item => item.selected === true);

  useEffect(() => {
    props.actionFetchGroupDetail(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isEmpty(groupDetail)) {
      setGroupInfo({ ...groupDetail });
      setLogoGroup(groupDetail.logo || images.avatar_default_120);
      setCoverGroup(groupDetail.cover || images.cover_default);
    }
  }, [groupDetail]);

  const handleUpdateGroup = async e => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      e.target.groupName.focus();
      return;
    }
    const data = {
      group_name: e.target.groupName.value,
      group_description: e.target.groupDes.value,
      group_sologan: e.target.slogan.value,
      group_address: e.target.address.value,
      group_phone: e.target.phoneNumber.value,
      group_email: e.target.email.value,
      group_website: e.target.email.website
    };
    try {
      setLoading(true);
      await actionUpdateGroupInfo(data);
      const res = await getProfileService();
      if (res.data.data) {
        props.actionGetProfile(res.data.data);
        props.actionActiveGroup(res.data.data.group_active);
      }
      handleToast('success', t('IDS_WP_CHANGE_INFO_GROUP_SUCCESS'));
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      handleToast('error', error.message);
      setLoading(false);
    }
  };
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleCropImage = async (image, type) => {
    let formData = new FormData();
    formData.append('image', image);
    setUpdatingImg(true);
    if (type === CROP_TYPE.LOGO) {
      try {
        const { data } = await actionUpdateLogoGroup(formData);
        setLogoGroup(data.logo);
        props.actionFetchGroupDetail(true);
        setUpdatingImg(false);
        handleToast('success', t('IDS_WP_CHANGE_LOGO_SUCCESS'));
      } catch (error) {
        handleToast('error', error.message);
        setUpdatingImg(false);
      }
    } else if ((type = CROP_TYPE.COVER)) {
      try {
        const { data } = await actionUpdateCoverGroup(formData);
        setCoverGroup(data.cover);
        props.actionFetchGroupDetail(true);
        handleToast('success', t('IDS_WP_CHANGE_COVER_SUCCESS'));
        setUpdatingImg(false);
      } catch (error) {
        handleToast('error', error.message);
        setUpdatingImg(false);
      }
    }
  };

  const handleUploadFile = evt => {
    const file = evt.target.files[0];
    setShowInputFile(false);
    if (file) {
      setVisibleCropModal(true);
      setFileUpload(file);
    }
    // reset input file
    setTimeout(() => {
      setShowInputFile(true);
    }, 0);
  };

  const handleOnchangeInput = (e, name) => {
    const value = e.target.value;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  const handleResetImage = async type => {
    let formData = new FormData();
    // check image is base64 or not
    let base64Matcher = new RegExp(
      '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$'
    );

    setUpdatingImg(true);
    try {
      if (type === CROP_TYPE.LOGO) {
        if (base64Matcher.test(images.avatar_default_120)) {
          formData.append(
            'image',
            convertBase64ToBlob(images.avatar_default_120, 'image/png')
          );
          const { data } = await actionUpdateLogoGroup(formData);
          setLogoGroup(data.logo);
          props.actionFetchGroupDetail(true);
          setUpdatingImg(false);
        } else {
          convertUrlToBlob(
            images.avatar_default_120,
            'image/png',
            async blob => {
              formData.append('image', blob);
              const { data } = await actionUpdateLogoGroup(formData);
              setLogoGroup(data.logo);
              props.actionFetchGroupDetail(true);
              setUpdatingImg(false);
            },
            () => {
              setUpdatingImg(false);
            }
          );
        }
      } else {
        if (base64Matcher.test(images.cover_default)) {
          formData.append(
            'image',
            convertBase64ToBlob(images.cover_default, 'image/png')
          );
          const { data } = await actionUpdateCoverGroup(formData);
          setCoverGroup(data.cover);
          props.actionFetchGroupDetail(true);
          setUpdatingImg(false);
        } else {
          convertUrlToBlob(
            images.cover_default,
            'image/png',
            async blob => {
              formData.append('image', blob);
              const { data } = await actionUpdateCoverGroup(formData);
              setCoverGroup(data.cover);
              props.actionFetchGroupDetail(true);
              setUpdatingImg(false);
            },
            () => {
              setUpdatingImg(false);
            }
          );
        }
      }
    } catch (error) {
      setUpdatingImg(false);
    }
  };
  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };
  console.log('test', props.profile);
  return (
    <div className="setting-group-info">
      <div className="group-info-left">
        <LoadingContent loading={isLoading || false}>
          <p className="code-group-text">
            ID: {groupInfo.code}&nbsp;
            <Icon
              path={mdiContentCopy}
              size={1}
              color="#a5a5a5"
              className="cursor-pointer"
              title={t('IDS_WP_COPY_TEXT_CLIPBOARD')}
              onClick={e => {
                handleCopyText(groupInfo.code);
                e.stopPropagation();
              }}
            />
          </p>
          <form className="form-group-info" onSubmit={handleUpdateGroup}>
            <TextField
              id="groupName"
              label={
                <span>
                  {t('IDS_WP_GROUP_NAME')}
                  <i className="lb-secondary">
                    ({t('IDS_WP_GROUP_NAME_LIMIT')})
                  </i>
                </span>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 120,
                required: true,
                readOnly: !editMode
              }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'name')}
              value={groupInfo.name || ''}
            />
            <TextField
              id="groupDes"
              label={
                <span>
                  {t('IDS_WP_GROUP_DES')}
                  <i className="lb-secondary">
                    ({t('IDS_WP_GROUP_DES_LIMIT')})
                  </i>
                </span>
              }
              fullWidth
              margin="normal"
              multiline
              rows="2"
              rowsMax="4"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 300,
                required: true,
                readOnly: !editMode
              }}
              disabled={!editMode}
              className="input-item input-area"
              onChange={e => handleOnchangeInput(e, 'description')}
              value={groupInfo.description || ''}
            />
            <TextField
              id="slogan"
              label={
                <span>
                  {t('IDS_WP_GROUP_SLOGAN')}
                  <i className="lb-secondary">
                    ({t('IDS_WP_GROUP_SLOGAN_LIMIT')})
                  </i>
                </span>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 160 }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'sologan')}
              value={
                groupInfo.sologan || 'WorkPlus - Thêm công việc, thêm niềm vui'
              }
            />
            <TextField
              id="address"
              label={t('IDS_WP_ADDRESS')}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'address')}
              value={
                groupInfo.address || 'Số 3/259 Phố Định Công, Hoàng Mai, Hà Nội'
              }
            />
            <TextField
              id="website"
              label="Website"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'website')}
              value={groupInfo.website || 'www.workplus.vn'}
            />
            <TextField
              id="phoneNumber"
              label={t('IDS_WP_PHONE')}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'phone')}
              value={groupInfo.phone || '024.6326.5870'}
            />
            <TextField
              id="email"
              label="Email"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ type: 'email' }}
              disabled={!editMode}
              className="input-item"
              onChange={e => handleOnchangeInput(e, 'email')}
              value={groupInfo.email || 'info@workplus.vn'}
            />
            <div className="block-action">
              <Button
                variant="contained"
                className="btn-action none-boxshadow"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <CircularProgress size={20} className="margin-circular" />
                )}
                {editMode ? t('IDS_WP_SAVE') : t('IDS_WP_EDIT_TEXT')}
              </Button>
              {editMode && (
                <Button
                  variant="contained"
                  className="btn-action btn-cancel none-boxshadow"
                  onClick={() => {
                    props.actionFetchGroupDetail();
                    setEditMode(false);
                  }}
                >
                  {t('IDS_WP_CANCEL')}
                </Button>
              )}
            </div>
          </form>
        </LoadingContent>
      </div>

      <div className="group-info-right">
        {showInputFile && (
          <input
            className="input-file"
            accept="image/*"
            id="raised-button-file"
            type="file"
            onChange={handleUploadFile}
          />
        )}
        <LoadingContent loading={updatingImg || false}>
          <div className="setting-image-group">
            <div className="heading-title">
              <span>{t('IDS_WP_GROUP_LOGO')} (120x120px)</span>
              <span className="action-update-img">
                <Button
                  className="crop-image-btn"
                  color="primary"
                  component="label"
                  htmlFor="raised-button-file"
                  disableTouchRipple
                  // disabled={true}
                  onClick={() => setCropType(CROP_TYPE.LOGO)}
                >
                  {t('IDS_WP_CHANGE_LOGO')}
                </Button>
                <Divider orientation="vertical" />
                <Button
                  className="crop-image-btn"
                  color="primary"
                  component="label"
                  disableTouchRipple
                  onClick={() => handleResetImage(CROP_TYPE.LOGO)}
                >
                  {t('IDS_WP_USE_DEFAULT')}
                </Button>
              </span>
            </div>
            <Divider className="divider" />
            <div className="image-content">
              <img alt="" src={logoGroup} className="img-logo" />
            </div>
          </div>
          <div className="setting-image-group setting-cover">
            <div className="heading-title">
              <span>{t('IDS_WP_COVER_IMAGE_GROUP')} (1200x400px)</span>
              <span className="action-update-img">
                {props.profile.type === 'Pro' && (
                  <Button
                    className="crop-image-btn"
                    color="primary"
                    component="label"
                    htmlFor="raised-button-file"
                    disableTouchRipple
                    onClick={() => setCropType(CROP_TYPE.COVER)}
                  >
                    {t('IDS_WP_CHANGE_COVER_IMAGE')}
                  </Button>
                )}
                {props.profile.type === 'Pro' && (
                  <Divider orientation="vertical" />
                )}

                <Button
                  className="crop-image-btn"
                  color="primary"
                  component="label"
                  disableTouchRipple
                  onClick={() => {
                    handleResetImage(CROP_TYPE.COVER);
                  }}
                >
                  {t('IDS_WP_USE_DEFAULT')}
                </Button>
              </span>
            </div>
            <Divider className="divider" />
            <div className="image-content">
              <img alt="" src={coverGroup} className="img-cover" />
            </div>
          </div>
        </LoadingContent>
        <div className="setting-bg-left-menu">
          <span className="lb-text">{t('IDS_WP_SELECT_COLOR')}</span>
          <span
            className="pick-color"
            style={{ background: bgColor.color }}
            onClick={() => setVisibleModal(true)}
          ></span>
          <PickColorModal
            open={visibleModal}
            setOpen={val => setVisibleModal(val || false)}
          />
        </div>
        {visibleCropModal && (
          <ImageCropper
            open={visibleCropModal}
            setOpen={val => setVisibleCropModal(val)}
            cropType={cropType}
            image={fileUpload}
            uploadImage={handleCropImage}
          />
        )}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isLoading: state.setting.isLoading,
    groupDetail: state.setting.groupDetail,
    colors: state.setting.colors,
    toast: state.system.toast,
    profile: state.system.profile
  }),
  { actionFetchGroupDetail, actionGetProfile, actionActiveGroup, actionToast }
)(Info);
