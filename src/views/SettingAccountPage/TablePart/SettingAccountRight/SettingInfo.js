import React, { Component, useState } from "react";
import { mdiAccountCircle } from "@mdi/js";
import { useTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import DateFnsUtils from "@date-io/date-fns";
import Icon from "@mdi/react";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import { get } from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  actionUpdateProfile,
  actionUpdateAvatar,
} from "../../../../actions/account";
import {
  actionCheckVerifyAccount,
  actionChangeAccount,
} from "../../../../actions/user/detailUser";
import {
  getProfileService,
  actionGetProfile,
  actionToast,
} from "../../../../actions/system/system";
import ImageCropper from "../../../../components/ImageCropper/ImageCropper";

import "./SettingAccountRight.scss";
import { IconVerify } from "components/IconSvg/Verify_check";
import CustomModal from "components/CustomModal";
import ReactParserHtml from "react-html-parser";
import { FormControl, InputAdornment, OutlinedInput } from "@material-ui/core";
import { thumbVerticalStyleDefault } from "react-custom-scrollbars/lib/Scrollbars/styles";
import ModalVerifyAccount from "./Modal/VerifyAccount";
class SettingInfo extends Component {
  state = {
    mode: "view",
    visibleCropModal: false,
    verifyAccount: false,
    fileUpload: null,
    avatar: null,
    visible: false,
    visibles: false,
    showInputFile: true,
    data: this.props.profile,
    errorVerify: null,
    email: null,
    selectedDate: this.props.profile.birthday
      ? moment(
          this.props.profile.birthday,
          this.props.profile.format_date
        ).toDate()
      : new Date(),
    loading: false,
  };
  componentDidMount() {
    this.getProfile();
    //  this.handlegetMail()
  }

  // handlegetMail(){
  //   if(this.props.profile.email){
  //     this.setState({email: this.props.profile.email})
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile && this.props.profile) {
      this.setState({
        selectedDate: moment(
          this.props.profile.birthday,
          this.props.profile.format_date
        ).toDate(),
        email: this.props.profile.email,
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
    if (this.state.mode === "view") {
      this.setState({ mode: "edit" });
    } else if (this.state.mode === "edit") {
      this.handleChangeProfile();
    }
  };
  handleChangeProfile = async (type) => {
    try {
      this.setState({ loading: true });
      const file = new File([this.state.avatar], "filename");
      let formData = new FormData();
      if (type === "updateImage") {
        formData.append("image", file);
        await actionUpdateAvatar(formData);
      } else {
        const bodyData = {
          name: this.state.data.name,
          email: this.state.data.email,
          gender: this.state.data.gender,
          phone: this.state.data.phone,
          birthday: moment(this.state.selectedDate).format("YYYY-MM-DD"),
          address: this.state.data.address,
          certificate: this.state.data.certificate,
          description: this.state.data.description,
          job: this.state.data.job,
          order_user_id: this.state.data.order_user_id,
          order_storage_id: this.state.data.order_storage_id,
          type: this.state.data.type,
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
      this.handleToast("success", this.props.t("IDS_WP_UPDATE_SUCCESS"));
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: "view", loading: false });
    } catch (error) {
      this.handleToast("error", this.props.t("IDS_WP_UPDATE_ERROR"));
      const { data } = await getProfileService();
      if (data.data) this.props.actionGetProfile(data.data);
      this.setState({ mode: "view", loading: false });
    }
  };

  handleToast = (type, message) => {
    this.props.actionToast(type, message);
    setTimeout(() => this.props.actionToast(null, ""), 2000);
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.profile,
    });
  }
  handleChangeData = (name, value) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };
  handleUploadFile = (e) => {
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
          avatar: image,
        };
      },
      () => this.handleChangeProfile("updateImage")
    );
  };

  handleClickVerify = async () => {
    try {
      const { data } = await actionCheckVerifyAccount();
      if (data.state) {
        this.setState({ visible: true });
      }
    } catch (error) {
      this.handleToast("error", this.props.t("SNACK_MUTATE_FAIL"));
      this.setState({ errorVerify: error.msg });
    }
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  handleChangeAccount = async e => {
    e.preventDefault();
    const account = {
      email: e.target.elements.email_new.value,
      password: e.target.elements.password.value,
    };
    try {
      const { data } = await actionChangeAccount(account);
      if (data.state) {
        this.handleToast("success", this.props.t("SNACK_MUTATE_SUCCESS"));
        this.setState({ visibles: false }); 
       setTimeout(() => {
        this.getProfile();
       }, 2000);
      }
    } catch (error) {
      this.handleToast("error", this.props.t("SNACK_MUTATE_FAIL"));
    }
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
      loading,
    } = this.state;
    const { t } = this.props;

    const formatDate = this.props.profile.format_date
      ? this.props.profile.format_date
          .replace(/DD/g, "dd")
          .replace(/YYYY/g, "yyyy")
      : "dd/MM/yyyy";
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
              {t("IDS_WP_CHANGE_AVATAR")}
            </Button>

            <p className="avatar-note-text">({t("IDS_WP_SIZE")}: 120x120 px)</p>
          </div>
          <div className="info-content-setting-info ">
            <div
              className="item-info row"
              style={{ padding: "20px", backgroundColor: "#f9f9f9" }}
            >
              <div
                className="title-item-info col-sm-3"
                style={{ fontWeight: "bold" }}
              >
                {t("IDS_WP_ACCOUNT")}
              </div>
              <InputBase
                className="value-item-info email col-sm-9"
                value={this.state.email}
                disabled={true}
                onChange={(e) => this.handleChangeData("email", e.target.value)}
              />
              <div className="col-sm-12">
                {this.props.profile.is_verify ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="check_verify">
                      <IconVerify />
                    </span>{" "}
                    <div style={{ color: "#13d413", marginLeft: "7px" }}>
                      {t("IDS_WP_VERIFY_ACCOUNT_AUTHENTICATED")}
                    </div>
                  </div>
                ) : (
                  <span style={{ color: "red", lineHeight: "18px" }}>
                    {t("IDS_WP_NOT_VERIFY_ACCOUNT_NOTIFY")}
                  </span>
                )}
                {!this.props.profile.is_verify && (
                  <div
                    style={{
                      color: "blue",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={this.handleClickVerify}
                  >
                    {t("IDS_WP_VERIFY_ACCOUNT")}
                  </div>
                )}
                <div
                  style={{
                    color: "blue",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => this.setState({ visibles: true })}
                >
                  {t("IDS_WP_CHANGE_ACCOUNT")}
                </div>

                <CustomModal
                  onCancle={() => this.setState({ visible: false })}
                  open={this.state.visible}
                  className="modal-verify-account"
                  setOpen={() => {
                    this.setState({visible: true});
                  }}
                  title={t("IDS_WP_VERIFY_ACCOUNT_TITLE_NOTIFY")}
                  confirmRender={null}
                  cancleRender={()=>(t("IDS_WP_BUTTON_CLOSE"))}
                  height="miniWide"
                >
                  <div className="modal-verify-account_content">
                    <p>
                      {t("IDS_WP_VERIFY_ACCOUNT_CONTENT_NOTIFY")}{" "}
                      <strong style={{ color: "red" }}>
                        {this.state.email}
                      </strong>
                    </p>
                    <p>
                      {ReactParserHtml(
                        t("IDS_WP_VERIFY_ACCOUNT_CONTENT_NOTIFY2")
                      )}
                    </p>
                  </div>
                </CustomModal>
                <ModalVerifyAccount email={this.state.email} visible={this.state.visible}  onCancle={()=>this.setState({visible: false})}/>
                <CustomModal
                  onCancle={() => this.setState({ visibles: false })}
                  open={this.state.visibles}
                  setOpen={() => this.setState({ visibles: true })}
                  title={t("IDS_WP_MODAL_CHANGE_ACCOUNT_TITLE")}
                  className="modal-change-account"
                  type="submit"
                  manualClose={true}
                  form="form-change-account"
                >
                  <form
                    className="form-content"
                    id="form-change-account"
                    onSubmit={this.handleChangeAccount}
                  >
                    <FormControl
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      className="input-affix-wrapper"
                    >
                      <div className="lb-input">
                        {t("IDS_WP_MODAL_CHANGE_ACCOUNT_LABEL_NOW")}{" "}
                      </div>
                      <div style={{ color: "red",
                          fontWeight: "600",
                          backgroundColor: "#E6E6E6",
                          padding: '15px',
                          border: "none",
                       }}>
                         {this.state.email}
                      </div>
                    </FormControl>
                    <FormControl
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      className="custom-input"
                    >
                      <div className="lb-input">
                        {t("IDS_WP_MODAL_CHANGE_ACCOUNT_LABEL_NEW")}{" "}
                        <span>*</span>
                      </div>
                      <OutlinedInput
                        id="email_new"
                        required
                        type="email"
                        placeholder={t(
                          "IDS_WP_MODAL_CHANGE_ACCOUNT_PLACEHOLDER_NEW"
                        )}
                        startAdornment={<InputAdornment position="start" />}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      className="custom-input"
                    >
                      <div className="lb-input">
                        {t("IDS_WP_MODAL_CHANGE_ACCOUNT_LABEL_PASSWORD")}{" "}
                        <span>*</span>
                      </div>
                      <OutlinedInput
                        id="password"
                        required
                        placeholder={t(
                          "IDS_WP_MODAL_CHANGE_ACCOUNT_PLACEHOLDER_PASSWORD"
                        )}
                        startAdornment={<InputAdornment position="start" />}
                      />
                    </FormControl>
                  </form>
                </CustomModal>
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_ACCOUNT_TYPE")}
              </div>
              <div className="value-item-info col-sm-9">
                <Chip
                  size="small"
                  label={data.type}
                  className={
                    get(data.group_active, "is_expire", false)
                      ? "expire-account"
                      : "type-account"
                  }
                />
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_FULL_NAME")}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={this.props.user.name}
                disabled={mode !== "edit"}
                onChange={(e) => this.handleChangeData("name", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_BIRTHDAY")}
              </div>
              <div className="value-item-info col-sm-9">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    helperText={""}
                    format={formatDate}
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className="value-date-info"
                    disabled={mode !== "edit"}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-9 gender-title">
                {t("IDS_WP_GENDER")}
              </div>
              {mode !== "edit" ? (
                <InputBase
                  className="value-item-info col-sm-3 gender-content"
                  value={
                    data.gender === 1 ? t("IDS_WP_FEMALE") : t("IDS_WP_MALE")
                  }
                  disabled={true}
                />
              ) : (
                <Select
                  native
                  className="value-item-info col-sm-3 gender-content"
                  value={data.gender}
                  onChange={(e) =>
                    this.handleChangeData("gender", e.target.value)
                  }
                >
                  <option value={1}>{t("IDS_WP_FEMALE")}</option>
                  <option value={0}>{t("IDS_WP_MALE")}</option>
                </Select>
              )}
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_PHONE")}
              </div>
              <InputBase
                type="number"
                className="value-item-info col-sm-9 phone-infor"
                value={data.phone}
                disabled={mode !== "edit"}
                onChange={(e) => this.handleChangeData("phone", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_ADDRESS")}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.address}
                disabled={mode !== "edit"}
                onChange={(e) =>
                  this.handleChangeData("address", e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_CERTIFICATE")}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.certificate}
                disabled={mode !== "edit"}
                onChange={(e) =>
                  this.handleChangeData("certificate", e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_CAREER")}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.job}
                disabled={mode !== "edit"}
                onChange={(e) => this.handleChangeData("job", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <div className="title-item-info col-sm-3">
                {t("IDS_WP_ORTHER_INFO_TEXT")}
              </div>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.description}
                disabled={mode !== "edit"}
                onChange={(e) =>
                  this.handleChangeData("description", e.target.value)
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
                {mode === "view" ? t("IDS_WP_UPDATE") : t("IDS_WP_SAVE")}
              </Button>
              {mode === "edit" && (
                <Button
                  variant="contained"
                  className="btn-action cancel-btn none-boxshadow"
                  onClick={() =>
                    this.setState({
                      mode: "view",
                      data: { ...this.props.profile },
                      selectedDate: this.props.profile.birthday,
                    })
                  }
                >
                  {t("IDS_WP_CANCEL")}
                </Button>
              )}
            </div>
          </div>
        </div>
        {visibleCropModal && (
          <ImageCropper
            open={visibleCropModal}
            setOpen={(val) => this.setState({ visibleCropModal: val })}
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
  (state) => ({
    profile: state.system.profile,
    user: state.user.detailUser,
  }),
  {
    actionGetProfile,
    actionToast,
    actionCheckVerifyAccount,
    actionChangeAccount,
  }
)(withTranslation()(SettingInfo));
