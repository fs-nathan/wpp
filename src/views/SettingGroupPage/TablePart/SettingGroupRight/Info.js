import React, { Component } from 'react';
import { Button, TextField, Divider } from '@material-ui/core';
import ImageCropper from './ImageCropper/ImageCropper';
import * as images from '../../../../assets';
import './SettingGroupRight.scss';

class Info extends Component {
  state = {
    showInputFile: true,
    visibleCropModal: false,
    fileUpload: null,
    logoGroup: images.vtask_logo,
    coverGroup: images.vtask_logo,
    cropType: 'logo',
    groupName: 'Workplus Platform',
    groupDes:
      'Workplus Platform là nền tảng quản lý công việc cho doanh nghiệp, đội nhóm. W+ cho phép thành viên làm việc tập trung, cộng tác không giới hạn. Làm việc mọi lúc mọi nơi trên mọi thiết bị nhờ công nghệ điện toán đám mây - thời gian thực.',
    slogan: 'Workplus Platform',
    address: 'Workplus Platform',
    website: 'www.workplus.vn',
    phoneNumber: '090986868',
    email: 'info@vanht.com'
  };

  handleUpdateGroup = e => {
    e.preventDefault();
    const data = {
      groupName: e.target.groupName.value,
      groupDes: e.target.groupDes.value,
      slogan: e.target.slogan.value,
      address: e.target.address.value,
      website: e.target.website.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value
    };
    console.log(data);
  };

  handleCropImage = (image, type) => {
    console.log(image);
    console.log(type);
    if (type === 'logo') {
      this.setState({ logoGroup: image });
    } else if ((type = 'cover')) {
      this.setState({ coverGroup: image });
    }
  };

  handleUploadFile = evt => {
    const file = evt.target.files[0];
    this.setState({ showInputFile: false });
    if (file) {
      this.setState({ visibleCropModal: true, fileUpload: file });
    }
    // reset input file
    setTimeout(() => {
      this.setState({ showInputFile: true });
    }, 0);
  };

  render() {
    const {
      showInputFile,
      visibleCropModal,
      fileUpload,
      logoGroup,
      coverGroup,
      cropType,
      groupName,
      groupDes,
      slogan,
      address,
      website,
      phoneNumber,
      email
    } = this.state;
    return (
      <div className="setting-group-info">
        <div className="group-info-left">
          <form className="form-group-info" onSubmit={this.handleUpdateGroup}>
            <TextField
              id="groupName"
              label={
                <span>
                  Tên nhóm
                  <i className="lb-secondary">(tối đa 120 ký tự)</i>
                </span>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                maxLength: 120,
                required: true
              }}
              className="input-item"
              defaultValue={groupName}
            />
            <TextField
              id="groupDes"
              label={
                <span>
                  Mô tả nhóm
                  <i className="lb-secondary">(tối đa 300 ký tự)</i>
                </span>
              }
              fullWidth
              margin="normal"
              multiline
              rows="2"
              rowsMax="4"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                maxLength: 300
              }}
              className="input-item input-area"
              defaultValue={groupDes}
            />
            <TextField
              id="slogan"
              label={
                <span>
                  Slogan nhóm
                  <i className="lb-secondary">(tối đa 160 ký tự)</i>
                </span>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                maxLength: 160
              }}
              className="input-item"
              defaultValue={slogan}
            />
            <TextField
              id="address"
              label="Địa chỉ"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              className="input-item"
              defaultValue={address}
            />
            <TextField
              id="website"
              label="Website"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              className="input-item"
              defaultValue={website}
            />
            <TextField
              id="phoneNumber"
              label="Điện thoại"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              className="input-item"
              defaultValue={phoneNumber}
            />
            <TextField
              id="email"
              label="Email"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                type: 'email'
              }}
              className="input-item"
              defaultValue={email}
            />
            <div className="block-action">
              <Button variant="contained" className="btn-action" type="submit">
                Chỉnh sửa
              </Button>
            </div>
          </form>
        </div>
        <div className="group-info-right">
          {showInputFile && (
            <input
              className="input-file"
              accept="image/*"
              id="raised-button-file"
              type="file"
              onChange={this.handleUploadFile}
            />
          )}
          <div className="setting-image-group">
            <div className="heading-title">
              <span>Logo nhóm (120x120px)</span>
              <Button
                color="primary"
                component="label"
                htmlFor="raised-button-file"
                onClick={() => {
                  this.setState({ cropType: 'logo' });
                }}
              >
                Đổi ảnh logo
              </Button>
            </div>
            <Divider className="divider" />
            <div className="image-content">
              <img alt="" src={logoGroup} className="img-logo" />
            </div>
          </div>
          <div className="setting-image-group setting-cover">
            <div className="heading-title">
              <span>Ảnh cover nhóm (1200x400px)</span>
              <Button
                color="primary"
                component="label"
                htmlFor="raised-button-file"
                onClick={() => {
                  this.setState({ cropType: 'cover' });
                }}
              >
                Đổi ảnh cover
              </Button>
            </div>
            <Divider className="divider" />
            <div className="image-content">
              <img alt="" src={coverGroup} className="img-cover" />
            </div>
          </div>
          <ImageCropper
            open={visibleCropModal}
            setOpen={val => this.setState({ visibleCropModal: val })}
            cropType={cropType}
            image={fileUpload}
            uploadImage={this.handleCropImage}
          />
        </div>
      </div>
    );
  }
}

export default Info;
