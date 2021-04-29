import CustomModal from "components/CustomModal";
import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { mdiAccountCog, mdiLock, mdiLockOutline } from "@mdi/js";
import { IconAccountInternal } from "components/IconSvg/Verify_check";
import "./style.scss";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import CustomTextbox from "components/CustomTextbox";
import MySelect from "components/MySelect";
import { find, get, _filter, isNil } from "lodash";
import { connect, useDispatch } from "react-redux";
import { optionsSelector } from "views/MemberPage/Modals/UpdateUser/selectors";
import {
  actionGetInfor,
  actionUnLockUser,
  actionLockUser,
  actionResetPassword,
  actionUpdateUser,
  detailUser,
} from "actions/user/detailUser";
import { listUserOfGroup } from "actions/user/listUserOfGroup";
import { listRoom } from "actions/room/listRoom";
import { listPosition } from "actions/position/listPosition";
import { listMajor } from "actions/major/listMajor";
import { listLevel } from "actions/level/listLevel";
import { getUserOfRoom } from"actions/room/getUserOfRoom";
import { useMaxlenString } from "hooks";
import {
  CustomEventDispose,
  CustomEventListener,
  DETAIL_USER,
  LIST_USER_OF_GROUP,
  UPDATE_USER,
} from "constants/events";
import { updateUser } from "actions/user/updateUser";
import { actionToast } from "actions/system/system";
import { SignalCellularNull } from "@material-ui/icons";

const ModalSettingMember = ({
  inforUser,
  open,
  setOpen,
  data,
  updatedUser = null,
  options,
  doUpdateUser,
  doListLevel,
  doListMajor,
  doListPosition,
  doListRoom,
  doReloadUser,
  doReloadListUser,
  doGetUserOfRoom
}) => {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState(data.user);
  const [tab, setTab] = React.useState("1");
  const [room, setRoom] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [major, setMajor] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [description, setDescription] = useMaxlenString("", 500);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);
  const [pwdNotMatch, setPwdNotMatch] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isUpdate, setIsUpdate] = React.useState(null);
  const [isLock, setIsLock] = React.useState(inforUser?.userInfor?.is_lock);
  const [roomId,setRoomId] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setProfile(data.user);
    setRoomId(data.roomId)
  }, [data, data.user]);
  
  const handleChangeTab = (key) => {
    setTab(key);
  };
  React.useEffect(() => {
    setIsLock(inforUser?.userInfor?.is_lock);
  }, [inforUser?.userInfor?.is_lock]);
  const handleCheckPwd = () => {
    let pwd = document.getElementById("new_password").value;
    let confirmPwd = document.getElementById("confirm_new_password").value;
    if (pwd && confirmPwd && pwd !== confirmPwd) {
      setPwdNotMatch(true);
    } else {
      setPwdNotMatch(false);
    }
  };

  React.useEffect(() => {
    setActiveLoading(activeMask === 3 || activeMask === -1 ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setRoom(null);
      setPosition(null);
      setMajor(null);
      setLevel(null);
      setDescription("");
    }
  }, [activeMask, setDescription, setOpen]);
  React.useEffect(() => {
    if (updatedUser) {
      setRoom(get(updatedUser, "room_id"));
      setPosition(get(updatedUser, "position_id"));
      setMajor(get(updatedUser, "major_id"));
      setLevel(get(updatedUser, "level_id"));
      setDescription(get(updatedUser, "description", ""));
    }
  }, [setDescription, updatedUser]);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await actionResetPassword({
        account_id: profile.id,
        password: e.target.elements.new_password.value,
      });
      if (data.state) {
        handleToast("success", t("IDS_WP_RESET_PASSWORD_SUCCESS"));
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
      setErrorMsg(error);
    }
  };

  const handleToast = (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => dispatch(actionToast(null, "")), 2000);
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const reqData = {
      user_id: profile.id,
      room,
      position,
      level,
      major,
      description,
    };
    try {
      const { data } = await actionUpdateUser(reqData);
      if (data.state) {
        const filt = get(find(options.positions, { id: position }), "name");
        setIsUpdate(filt);
        setIsLock(!isLock);
        doReloadListUser();
        if(roomId){
          doGetUserOfRoom({roomId: roomId});
        }
        handleToast("success", t("IDS_WP_UPDATE_USER_SUCCESS"));
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };

  const handleLockAccount = async () => {
    try {
      const { data } = await actionLockUser({ account_id: profile.id });
      if (data.state) {
        handleToast("success", t("IDS_WP_LOCK_ACCOUNT"));
        dispatch(actionGetInfor(profile.id));
        setIsLock(!isLock);
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };

  const handleUnLockAccount = async () => {
    try {
      const { data } = await actionUnLockUser({ account_id: profile.id });
      if (data.state) {
        handleToast("success", t("IDS_WP_UN_LOCK_ACCOUNT"));
        dispatch(actionGetInfor(profile.id));
        setIsLock(!isLock);
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };
  React.useEffect(() => {
    if (data.user) {
      dispatch(actionGetInfor(data?.user?.id));
    }
  }, [data, dispatch]);
  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(UPDATE_USER.SUCCESS, doReloadUser);
    CustomEventListener(UPDATE_USER.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_USER.SUCCESS, doReloadUser);
      CustomEventDispose(UPDATE_USER.FAIL, fail);
    };
    // eslint-disable-next-line
  }, [updatedUser]);

  React.useEffect(() => {
    const success = (bit) => () => {
      setActiveMask((oldMask) => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(DETAIL_USER.SUCCESS, success(0));
    CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
    CustomEventListener(DETAIL_USER.FAIL, fail);
    CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(DETAIL_USER.SUCCESS, success(0));
      CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
      CustomEventDispose(DETAIL_USER.FAIL, fail);
      CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
    };
    // eslint-disable-next-line
  }, [updatedUser]);

  React.useEffect(() => {
    doListRoom();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListPosition();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListMajor();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListLevel();
    // eslint-disable-next-line
  }, []);
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      onCancle={() => setOpen(false)}
      manualClose={true}
      className="modal_setting-member"
      title={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.MEMBER.TITLE")}
      cancleRender={
        (tab === "2") | (tab === "3") && (() => t("LABEL_CHAT_TASK_THOAT"))
      }
      confirmRender={(tab === "2") | (tab === "3") && (() => null)}
      type="submit"
      form="form-update-account"
    >
      {profile && inforUser.userInfor && (
        <div className="modalSettingMember">
          <div className="modalSettingMember-tab-left">
            <div
              className="modalSettingMember-tab-left_profile"
              onClick={handleChangeTab}
            >
              <img src={inforUser.userInfor.avatar} alt="" />
              <h5>{inforUser.userInfor.name}</h5>
              <p style={{ textTransform: "capitalize" }}>
                {(isUpdate && isUpdate) ||
                  inforUser.userInfor.position_name ||
                  null}
              </p>
              <p>
                {t("IDS_WP_SPECIES")}:{" "}
                <span style={{ color: "red" }}>{profile.role}</span>
              </p>
              <p>
                {t("DMH.VIEW.DP.RIGHT.UT.STATE.TITLE")}:{" "}
                <span style={{ color: "green", fontSize: "14px" }}>
                  {!inforUser.userInfor.is_locked
                    ? t("DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.ACTIVE")
                    : t("DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.LOCK")}
                </span>
              </p>
              <p>
                {t("views.calendar_page.right_part.label.created_by")}:{" "}
                {inforUser.userInfor.user_create}
              </p>
              <p>
                {t("views.calendar_page.right_part.label.created_at")}:{" "}
                {inforUser.userInfor.createdAt}
              </p>
            </div>
            <div className="modalSettingMember-tab-left_menu">
              <div
                className={`modalSettingMember-tab-left_menu-item ${
                  tab === "1" && "modalSettingMember-tab-left_menu-item_active"
                }`}
                onClick={() => handleChangeTab("1")}
              >
                <div>
                  <Icon
                    path={mdiAccountCog}
                    size={1}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </div>
                <div>{t("IDS_WP_COMMON_SETUP")}</div>
              </div>
              <div
                className={`modalSettingMember-tab-left_menu-item ${
                  tab === "2" && "modalSettingMember-tab-left_menu-item_active"
                }`}
                onClick={() => handleChangeTab("2")}
              >
                <div>
                  <IconAccountInternal />
                </div>
                <div>{t("IDS_WP_ACCOUNT_INTERNAL")}</div>
              </div>
              <div
                className={`modalSettingMember-tab-left_menu-item ${
                  tab === "3" && "modalSettingMember-tab-left_menu-item_active"
                }`}
                onClick={() => handleChangeTab("3")}
              >
                <div>
                  <Icon path={mdiLock} size={1} color="rgba(0, 0, 0, 0.54)" />
                </div>
                <div>{t("IDS_WP_LOCK_MEMBER")}</div>
              </div>
            </div>
          </div>
          <div className="modalSettingMember-right">
            {tab === "1" ? (
              <div className="modalSettingMember-right_config">
                <form id="form-update-account" onSubmit={handleUpdateAccount}>
                  <FormControl fullWidth>
                    <MySelect
                      label={t("DMH.VIEW.MP.MODAL.UPT.ROOM")}
                      options={options.rooms.map((room) => ({
                        label: get(room, "name"),
                        value: get(room, "id"),
                      }))}
                      value={{
                        label: get(find(options.rooms, { id: room }), "name"),
                        value: room,
                      }}
                     
                      onChange={({ value: roomId }) => setRoom(roomId)}
                      placeholder={t("DMH.VIEW.MP.MODAL.UPT.ROOM")}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <MySelect
                      label={t("DMH.VIEW.MP.MODAL.UPT.POSITION")}
                      options={options.positions.map((position) => ({
                        label: get(position, "name"),
                        value: get(position, "id"),
                      }))}
                      required
                      value={{
                        label: get(
                          find(options.positions, { id: position }),
                          "name"
                        ),
                        value: position,
                      }}
                      onChange={({ value: positionId }) =>
                        setPosition(positionId)
                      }
                      placeholder={t("DMH.VIEW.MP.MODAL.UPT.POSITION")}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <MySelect
                      label={t("DMH.VIEW.MP.MODAL.UPT.LEVEL")}
                      options={options.levels.map((level) => ({
                        label: get(level, "name"),
                        value: get(level, "id"),
                      }))}
                      required
                      value={{
                        label: get(find(options.levels, { id: level }), "name"),
                        value: level,
                      }}
                      onChange={({ value: levelId }) => setLevel(levelId)}
                      placeholder={t("DMH.VIEW.MP.MODAL.UPT.LEVEL")}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <MySelect
                      label={t("DMH.VIEW.MP.MODAL.UPT.MAJOR")}
                      options={options.majors.map((major) => ({
                        label: get(major, "name"),
                        value: get(major, "id"),
                      }))}
                      value={{
                        label: get(find(options.majors, { id: major }), "name"),
                        value: major,
                      }}
                      onChange={({ value: majorId }) => setMajor(majorId)}
                      placeholder={t("DMH.VIEW.MP.MODAL.UPT.MAJOR")}
                    />
                  </FormControl>
                  <CustomTextbox
                    className="view_Member_UpdateUser_Modal___text-box"
                    value={description}
                    label={t("DMH.VIEW.MP.MODAL.UPT.DESC")}
                    onChange={(newDescription) =>
                      setDescription(newDescription)
                    }
                    multiline={true}
                  />
                  {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                </form>
              </div>
            ) : tab === "2" ? (
              <div className="modalSettingMember-right_account-internal">
                <h5>{t("IDS_WP_RESET_PASSWORD")}</h5>
                <div className="modalSettingMember-right_account-internal--note">
                  {t("IDS_WP_RESET_PASSWORD_NOTE")}
                </div>
                <form onSubmit={handleResetPassword}>
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    className="input-affix-wrapper custom-input item-pwd"
                  >
                    <OutlinedInput
                      id="new_password"
                      required
                      type="password"
                      onBlur={handleCheckPwd}
                      autoComplete="new-password"
                      placeholder={t("IDS_WP_NEW_PASSWORD")}
                      size="small"
                      inputProps={{ maxLength: 20, minLength: 8 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            className="icon-prefix"
                            path={mdiLockOutline}
                            size={1}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    className="input-affix-wrapper custom-input"
                  >
                    <OutlinedInput
                      id="confirm_new_password"
                      required
                      type="password"
                      onBlur={handleCheckPwd}
                      autoComplete="new-password"
                      placeholder={t("IDS_WP_RE_INPUT_NEW_PASSWORD")}
                      inputProps={{ maxLength: 20, minLength: 8 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            className="icon-prefix"
                            path={mdiLockOutline}
                            size={1}
                          />
                        </InputAdornment>
                      }
                    />
                    {pwdNotMatch && (
                      <div style={{ color: "red", marginTop: "15px" }}>
                        {t("IDS_WP_CHECK_PASSWORD")}
                      </div>
                    )}
                  </FormControl>
                  <div style={{ fontSize: "14px", marginTop: "20px" }}>
                    {t("IDS_WP_PASSWORD_VALID_DES")}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="modalSettingMember-right_account-internal--btn_reset"
                    type="submit"
                  >
                    {t("IDS_WP_RESET")}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="modalSettingMember-right_account-internal">
                <h5>{t("IDS_WP_LOCK_MEMBER")}</h5>
                <div className="modalSettingMember-right_account-internal--note">
                  {t("IDS_WP_LOCK_MEMBER_FOREVER")}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="modalSettingMember-right_account-internal--btn_reset"
                  onClick={isLock ? handleUnLockAccount : handleLockAccount}
                >
                  {isLock ? t("IDS_WP_UNLOCK") : t("IDS_WP_LOCk")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </CustomModal>
  );
};
const mapStateToProps = (state) => {
  return {
    options: optionsSelector(state),
    inforUser: state.user.detailUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actionToast,
    doGetUserOfRoom: ({roomId}) => dispatch(getUserOfRoom({roomId})),
    doReloadUser: ({ userId }) => {
      dispatch(detailUser({ userId }, true));
      dispatch(listUserOfGroup(true));
    },
    doReloadListUser: () => dispatch(listUserOfGroup(true)),
    doUpdateUser: ({
      userId,
      roomId,
      levelId,
      majorId,
      positionId,
      description,
    }) =>
      dispatch(
        updateUser({
          userId,
          roomId,
          levelId,
          majorId,
          positionId,
          description,
        })
      ),

    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalSettingMember);
