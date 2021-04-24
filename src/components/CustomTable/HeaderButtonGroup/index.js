import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grow,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Popper,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  mdiClose,
  mdiDotsVertical,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiMagnify,
  mdiAccountPlus,
  mdiLaptop,
  mdiLockOutline,
  mdiDownload,
  mdiFilter,
} from "@mdi/js";
// import {
//   desireLoadingSelector,
//   desireUserSelector,
//   requireLoadingSelector,
//   requireUsersSelector
// } from "../";
import Icon from "@mdi/react";
import { find, get, isNil } from "lodash";
import * as images from "assets/index";
import Popover from '@material-ui/core/Popover';
import { connect, useDispatch } from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";
import AddUserModalPresenter from "views/DepartmentPage/Modals/AddUserModal/presenters";
import SearchInput from "../../SearchInput";
import { CustomTableContext } from "../index";
import "./style.scss";
import ReactParserHtml from "react-html-parser";
import {
  desireLoadingSelector,
  desireUserSelector,
  requireLoadingSelector,
  requireUsersSelector,
} from "views/DepartmentPage/LeftPart/AddUser/selectors";
import { searchUser, searchUserReset } from "actions/groupUser/searchUser";
import { actionAddMutipleMember } from "actions/groupUser/addMembertoGroup";
import { inviteUserJoinGroup } from "actions/groupUser/inviteUserJoinGroup";
import CustomModal from "components/CustomModal";
import { ImagesContent } from "views/KanbanPage/KanbanBoard/KanbanItem";
import { Link } from "react-router-dom";
import { mdiCheckDecagram, mdiUpload } from "@mdi/js";
import { listRoom } from "actions/room/listRoom";
import { CustomEventListener, CustomEventDispose } from "constants/events";
import { detailUser } from "actions/user/detailUser";
import { listUserOfGroup } from "actions/user/listUserOfGroup";
import { DETAIL_USER } from "constants/actions/user/detailUser";
import { LIST_USER_OF_GROUP } from "constants/actions/user/listUserOfGroup";
import { UPDATE_USER } from "constants/actions/user/updateUser";
import MySelect from "components/MySelect";
import { actionToast } from "actions/system/system";
export const StyledButton = ({ className = "", ...rest }) => (
  <Button
  
    className={`comp_CustomTable_HeaderButtonGroup___button ${className}`}
    {...rest}
  />
);

export const StyledPopper = ({ className = "", ...rest }) => (
  <Popper
    className={`comp_CustomTable_HeaderButtonGroup___popper ${className}`}
    {...rest}
  />
);

export const SearchBox = ({ className = "", ...rest }) => (
  <div
    className={`comp_CustomTable_HeaderButtonGroup___search-box ${className}`}
    {...rest}
  />
);

function HeaderButtonGroup({
  doSearchUser,
  desireUser,
  doListRoom,
  doSearchUserReset,
  doInviteUserJoinGroup,
  doReloadUser,
  resetDesireUser,
  profile,
  updatedUser = null, 
  room
}) {
  const { options } = React.useContext(CustomTableContext);
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [moreAnchor, setMoreAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openAddMember, setOpenAddMember] = React.useState(false);
  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [openUploadExcel, setOpenUploadExcel] = React.useState(false);
  const [fileExcel, setFileExcel] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [valueFilter,setValueFilter] = React.useState('');
  const [openResultCreateAccount, setOpenResultCreateAccount] = React.useState(
    false
  );
  const [roomList, setRoomList] = React.useState(null);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);
  const [
    openContinueCreateAccount,
    setOpenContinueCreateAccount,
  ] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [rowTable, setRowTable] = React.useState([
    {
      email: "account@gmail.com",
      name: "Trần Văn Nam",
      room: "Ban lãnh đạo",
    },
    {
      email: "",
      name: "",
      room: "",
    },
    {
      email: "",
      name: "",
      room: "",
    },
  ]);
  const dispatch = useDispatch();
  let fileInputRef = React.useRef();

  function onClickFromComputer() {
    document.getElementById("upload_file").value = null;
    fileInputRef.current.click();
  }
  function handleSearchClick(evt) {
    if (searchAnchor) {
      setSearchAnchor(null);
      get(options, "search.onChange", () => null)("");
    } else {
      setSearchAnchor(evt.currentTarget);
    }
  }

  function handleMoreOpen(evt) {
    setMoreAnchor(evt.currentTarget);
  }
  React.useEffect(()=>{
    if(room){
      setRoomList(room.data.rooms)
    }
  },[room])
  function handleMoreClick(handler) {
    return (evt) => {
      setMoreAnchor(null);
      handler();
    };
  }
  function handleAddMemberClick() {
    setOpenAddMember(true);
  }
  function handleMoreClose() {
    setMoreAnchor(null);
  }

  const onChangeFileExcel = (e) => {
    setFileExcel(e.target.files[0]);
  };

  const handleAddRowTable = () => {
    if (rowTable.length === 99) {
      setDisable(true);
    }
    setRowTable([...rowTable, { email: "", name: "", room: "" }]);
  };
  const handleDeleRowTable = (index) => {
    const newTable = rowTable.filter((el, indexEl) => indexEl !== index);
    setRowTable(newTable);
  };
  const handleOnchange = (key, index) => (e) => {
    const valueInput = e.target.value;
    const NewRowTable = rowTable.map((item, indexItem) => {
      if (indexItem === index) {
        return { ...item, [key]: valueInput };
      }
      return item;
    });
    //  const newData = {...rowTable[index], [key]: valueInput};
    setRowTable(NewRowTable);
  };

   const handleToast = (type, message) => {
    dispatch(actionToast(type,message))
   }
  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
   const {data} = await actionAddMutipleMember({account_list: rowTable, password: e.target.elements.password.value})
    if(data.state){
      handleToast('success', t('IDS_WP_CREATE_ACCOUNT_SUCCESS'))
       setOpenContinueCreateAccount(false);
       setOpenResultCreateAccount(true);
    }
  } catch (error) {
    console.log('err',error)
    handleToast('error', t('SNACK_MUTATE_FAIL'))
  }
    
   
  };

  const handleDeleteAllRow = () => {
    setRowTable([]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const handleChangeFilter = (e) => {
     setValueFilter(e.target.value)
  }
 
  React.useEffect(() => {
    doListRoom();
    // eslint-disable-next-line
  }, []);
  
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
  }, [updatedUser]);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ButtonGroup className="button-Group_header" size="small" variant="text">
        {get(options, "search") && (
          <StyledButton onClick={handleSearchClick}>
            <div>
              <Icon
                path={Boolean(searchAnchor) ? mdiClose : mdiMagnify}
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>{Boolean(searchAnchor) ? t("Hủy") : t("Tìm kiếm")}</span>
          </StyledButton>
        )}

        {get(options, "subActions", []).map((subAction, index) =>
          isNil(subAction) ? null : (
            <StyledButton
              key={index}
              onClick={(evt) => {
                get(subAction, "onClick", () => null)(evt);
                get(subAction, "noExpand", false) &&
                  get(options, "expand.bool", false) &&
                  get(options, "expand.toggleExpand", () => null)();
              }}
            >
              <div>
                {get(subAction, "iconPath") ? (
                  <Icon
                    path={get(subAction, "iconPath")}
                    size={1}
                    color={"rgba(0, 0, 0, 0.54)"}
                  />
                ) : (
                  get(subAction, "icon", () => null)()
                )}
              </div>
              <span>{t(get(subAction, "label", ""))}</span>
            </StyledButton>
          )
        )}

        {get(options, "addmember") && (
          <div>
            <StyledButton className="button" onClick={handleAddMemberClick}>
              <div>
                <Icon
                  path={mdiAccountPlus}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{t("LABEL_ADD_MEMBER")}</span>
            </StyledButton>
            <CustomModal
              title={t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}
              confirmRender={null}
              manualClose={true}
              maxWidth="sm"
              open={openAddMember}
              setOpen={setOpenAddMember}
              className="modal-add-member"
              onCancle={() => setOpenAddMember(false)}
              height={`mini`}
            >
              <div className="modal-add-member_content">
                <div
                  className="modal-add-member_card"
                  onClick={() => {
                    setOpen(true);
                    setOpenAddMember(false);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_add_member} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4>{t("DMH.VIEW.DP.RIGHT.UT.ADD_USER")}</h4>
                    <p>{t("LABEL_ADD_MEMBER_DESCRIPTION")}</p>
                  </div>
                </div>
                <div
                  className="modal-add-member_card"
                  onClick={() => {
                    setOpenAddMember(false);
                    setOpenCreateAccount(true);
                  }}
                >
                  <div className="modal-add-member_card-icon">
                    <img src={images.icon_create_user} alt="" />
                  </div>
                  <div className="modal-add-member_card-text">
                    <h4>{t("LABEL_CREATE_ACCOUNT_TITLE")}</h4>
                    <p>{t("LABEL_CREATE_ACCOUNT_DESCRIPTION")}</p>
                  </div>
                </div>
              </div>
            </CustomModal>

            <CustomModal
              title={t("IDS_WP_SIGN_UP")}
              open={openContinueCreateAccount}
              setOpen={setOpenContinueCreateAccount}
              onCancle={() => setOpenContinueCreateAccount(false)}
              confirmRender={null}
              cancleRender={null}
              className="modal_continue-create"
            >
              <form onSubmit={handleSubmit}>
                <div className="modal_continue-create_header">
                  <Button
                    disabled={disable}
                    className="account-internal_btn-create-account"
                    style={{ textTransform: "unset" }}
                    onClick={handleAddRowTable}
                  >
                    + {t("IDS_WP_ACCOUNT_INTERNAL_ADD_ROW")}
                  </Button>
                  <h3>{t("IDS_WP_ACCOUNT_INTERNAL_CREATE_LIST_ACCOUNT")}</h3>
                  <div
                    className="upload-excel"
                    onClick={() => {
                      setOpenContinueCreateAccount(false);
                      setOpenUploadExcel(true);
                    }}
                  >
                    <input
                      className="display-none"
                      id="upload_file"
                      multiple
                      type="file"
                      // onChange={onChangeFile}
                    />
                    <Icon
                      path={mdiUpload}
                      size={1}
                      color={"rgba(0, 0, 0, 0.54)"}
                    />

                    <div>{t("IDS_WP_ACCOUNT_INTERNAL_UPLOAD_EXCEL")}</div>
                  </div>
                </div>
                <div className="modal_continue-create_table">
                  <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NO")}</th>
                        <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_ACCOUNT")}</th>
                        <th>
                          {t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NAME_MEMBER")}
                        </th>
                        <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_PART")}</th>
                        <th>
                          <div
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={handleDeleteAllRow}
                          >
                            {t("IDS_WP_ACCOUNT_INTERNAL_TABLE_DELETE_ALL")}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowTable &&
                        rowTable.map((item, index) => (
                          <tr key={`${index}`}>
                            <td
                              style={{ textAlign: "center", padding: "0 10px" }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <input
                                onChange={handleOnchange("email", index)}
                                required
                                value={item.email && item.email}
                              />
                            </td>
                            <td>
                              <input
                                onChange={handleOnchange("name", index)}
                                required
                                value={item.name && item.name}
                              />
                            </td>
                            <td>
                      
                              <select
                                defaultValue={item.room && item.room}
                                onChange={handleOnchange("room", index)}
                              >
                                <option value=""></option>

                                {roomList && roomList.map((item,index)=>(
                                  <option key={index} value={item.id}>{item.name}</option>
                                ))}
                                
                              </select>
                            </td>

                            <td>
                              <Button onClick={() => handleDeleRowTable(index)}>
                                <Icon
                                  path={mdiClose}
                                  size={1}
                                  color={"rgba(0, 0, 0, 0.54)"}
                                />{" "}
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <p style={{ color: "red" }}>
                    {t("IDS_WP_ACCOUNT_INTERNAL_ADDED")}: {rowTable.length}/100{" "}
                    {t("IDS_WP_ACCOUNT_INTERNAL_ADDED_NOTE")}
                  </p>
                  <h5>
                    {t("IDS_WP_MODAL_CHANGE_ACCOUNT_LABEL_PASSWORD")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h5>
                  <div
                    style={{ whiteSpace: "break-spaces", lineHeight: "18px" }}
                  >
                    {ReactParserHtml(t("IDS_WP_ACCOUNT_INTERNAL_SET_PASSWORD"))}
                  </div>
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    className="input-affix-wrapper custom-input item-pwd"
                  >
                    <OutlinedInput
                      id="password"
                      required
                      type="password"
                      autoComplete="new-password"
                      placeholder={t("IDS_WP_PASSWORD")}
                      size="small"
                      // onBlur={handleCheckPwd}
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
                    <div
                      className="suggest-password"
                      style={{ marginTop: "15px" }}
                    >
                      {t("IDS_WP_ENTER_REGISTER_PASSWORD_SUGGESTED")}
                    </div>
                  </FormControl>
                </div>
                <div className="modal_continue-create_footer">
                  <Button
                    style={{ fontWeight: "500" }}
                    onClick={() => setOpenContinueCreateAccount(false)}
                  >
                    {t("DMH.COMP.CUSTOM_MODAL.CANCLE")}
                  </Button>
                  <Button
                    style={{ color: "blue", fontWeight: "500" }}
                    type="submit"
                  >
                    {t("IDS_WP_SIGN_UP")}
                  </Button>
                </div>
              </form>
            </CustomModal>

            <CustomModal
              open={openCreateAccount}
              setOpen={setOpenCreateAccount}
              onCancle={() => setOpenCreateAccount(false)}
              title={t("IDS_WP_ACCOUNT_INTERNAL_CREATE")}
              height={`mini`}
              confirmRender={null}
            >
              <div className="account-internal">
                <div className="account-internal_content">
                  <div className="account-internal_content-message">
                    <p>{t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_1")}</p>
                    <p
                      style={{ whiteSpace: "break-spaces", marginTop: "20px" }}
                    >
                      {t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_2")}
                    </p>
                    <p style={{ marginTop: "20px" }}>
                      {t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_4")}{" "}
                      <Link href="">
                        {t("IDS_WP_ACCOUNT_INTERNAL_LINK_MORE")}
                      </Link>
                    </p>
                    <p style={{ marginTop: "20px" }}>
                      {ReactParserHtml(t("IDS_WP_ACCOUNT_INTERNAL_MESSAGE_3"))}{" "}
                      <Link href="">
                        {t("IDS_WP_ACCOUNT_INTERNAL_LINK_GUIDE")}
                      </Link>
                    </p>
                    <p>
                      {profile.is_verify ? (
                        <div className="verify-account">
                          <Icon
                            path={mdiCheckDecagram}
                            size={1}
                            color={"rgba(0, 0, 0, 0.54)"}
                          />
                          <div>
                            {t("IDS_WP_ACCOUNT_INTERNAL_VERIFY_ACCOUNT")}
                          </div>
                        </div>
                      ) : (
                        <div className="no_verify-account">
                          <Icon
                            path={mdiCheckDecagram}
                            size={1}
                            color={"rgba(0, 0, 0, 0.54)"}
                          />
                          <div>
                            {t("IDS_WP_ACCOUNT_INTERNAL_NO_VERIFY_ACCOUNT")}
                          </div>
                        </div>
                      )}
                    </p>
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                      <Button
                        onClick={
                          !profile.is_verify
                            ? () => {setOpenCreateAccount(false);setOpenContinueCreateAccount(true)}
                            : null
                        }
                        className="account-internal_btn-create-account"
                        style={{
                          height: "50px",
                          width: "250px",
                          fontSize: "18px",
                        }}
                        variant="contained"
                        color="primary"
                      >
                        {!profile.is_verify
                          ? t("IDS_WP_ACCOUNT_INTERNAL_CONTINUE")
                          : t("IDS_WP_CONFIRM_ACCOUNT")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CustomModal>
            <AddUserModalPresenter
              open={open}
              setOpen={setOpen}
              handleSearchUser={doSearchUser}
              desireUser={desireUser}
              handleClearDesireUsers={() => resetDesireUser()}
              handleInviteUserJoinGroup={doInviteUserJoinGroup}
            />

            {/* modalOpenUploadExcel */}

            <CustomModal
              open={openUploadExcel}
              setOpen={setOpenUploadExcel}
              onCancle={() => setOpenUploadExcel(false)}
              title={t("IDS_WP_SIGN_UP")}
              confirmRender={() => (
                <span
                  style={{ fontSize: "16px", color: "#54abe8" }}
                  onClick={() => {
                    setOpenContinueCreateAccount(true);
                    setOpenUploadExcel(false);
                  }}
                >
                  {t("DMH.VIEW.PGP.LEFT.INFO.BACK")}
                </span>
              )}
              className="modal_upload-file_excel"
            >
              <div className="modal_upload-excel">
                <h3>{t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL")}</h3>
                <div style={{ lineHeight: "18px", whiteSpace: "break-spaces" }}>
                  {t("IDS_WP_ACCOUNT_INTERNAL_ENTER_DATA_EXCEL_TEXT")}
                </div>
                <div className="modal_upload-excel_downfile">
                  {t("IDS_WP_ACCOUNT_INTERNAL_DOWN_FILE_FORM")}
                </div>
                <div
                  className="upload-excel"
                  style={{ margin: "auto", marginTop: "40px" }}
                  onClick={onClickFromComputer}
                >
                  <input
                    className="display-none"
                    id="upload_file"
                    multiple
                    type="file"
                    ref={fileInputRef}
                    onChange={onChangeFileExcel}
                  />
                  <Icon
                    path={mdiUpload}
                    size={1}
                    color={"rgba(0, 0, 0, 0.54)"}
                  />

                  <div>{t("IDS_WP_ACCOUNT_INTERNAL_UPLOAD_EXCEL")}</div>
                </div>
              </div>
            </CustomModal>

            {/* modal_result_create_account */}
            <CustomModal
              open={openResultCreateAccount}
              setOpen={setOpenResultCreateAccount}
              onCancle={() => setOpenResultCreateAccount(false)}
              title={t("IDS_WP_SIGN_UP")}
              confirmRender={null}
              cancleRender={()=>(t('DMH.VIEW.DP.LEFT.ADD.LABEL.CLOSE'))}
              className="modal_result-create-account"
            >
              <div className="modal_result-create-account_table">
                <h3>
                  {t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_TITLE")}
                </h3>
                <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NO")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_ACCOUNT")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NAME_MEMBER")}</th>
                      <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_PART")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowTable &&
                      rowTable.map((item, index) => (
                        <tr key={`${index}`}>
                          <td
                            style={{ textAlign: "center", padding: "0 10px" }}
                          >
                            {index + 1}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.name}</td>
                          <td>{item.room}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="modal_result-create-account_action">
                <div>
                  {t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED")}{" "}
                  {rowTable.length}{" "}
                  {t(
                    "IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED_INTERNAL"
                  )}
                </div>
                <div
                  className="upload-excel"
                  // onClick={onClickFromComputer}
                >
                  <Icon
                    path={mdiDownload}
                    size={1}
                    color={"rgba(0, 0, 0, 0.54)"}
                  />

                  <div>{t("IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_DOWNLOAD_LIST")}</div>
                </div>
              </div>
            </CustomModal>
          </div>
        )}
        {get(options, "filter") && (
          <div>
          <StyledButton
          onClick={handleClick}
          aria-describedby={id}
        >
          <div>
            <Icon
              path={
                mdiFilter
              }
              size={1}
              color={"rgba(0, 0, 0, 0.54)"}
            />
          </div>
          <span>
            {get(options, "filter.label") && t('IDS_WP_ALL')}
          </span>
        </StyledButton>
        <Popover
        id={id}
        open={opens}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{padding: '10px 15px'}}>
          <h5>{t('IDS_WP_FILTER_LIST_MEMBER')}</h5>
        <RadioGroup aria-label="gender" name="gender1" value={valueFilter} onChange={handleChangeFilter}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="all" control={<Radio />} label={t('IDS_WP_ALL')} /> <div>27</div></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="join" control={<Radio />} label={t('IDS_WP_ACCOUNT_MEMBER_JOIN')} /><div>8</div></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="internal" control={<Radio />} label={t('IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED_INTERNAL')} /><div>1</div></div>
        </RadioGroup>
      </div>
      </Popover>
      </div>
        )}
        {get(options, "expand") && (
          <StyledButton
            onClick={get(options, "expand.toggleExpand", () => null)}
          >
            <div>
              <Icon
                path={
                  get(options, "expand.bool", false)
                    ? mdiFullscreenExit
                    : mdiFullscreen
                }
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>
              {get(options, "expand.bool", false) ? t("Thu gọn") : t("Mở rộng")}
            </span>
          </StyledButton>
        )}
        {get(options, "moreMenu") && (
          <StyledButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMoreOpen}
          >
            <div>
              <Icon
                path={mdiDotsVertical}
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>{t("Thêm")}</span>
          </StyledButton>
        )}
      </ButtonGroup>
      {get(options, "search") && (
        <StyledPopper
          open={Boolean(searchAnchor)}
          anchorEl={searchAnchor}
          transition
          placement="left"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={100}>
              <SearchBox>
                <SearchInput
                  placeholder={t("Nhập nội dung cần tìm")}
                  value={get(options, "search.patern", "")}
                  onChange={(evt) =>
                    get(
                      options,
                      "search.onChange",
                      () => null
                    )(evt.target.value)
                  }
                />
              </SearchBox>
            </Grow>
          )}
        </StyledPopper>
      )}
      {get(options, "moreMenu") && (
        <Menu
          id="simple-menu"
          anchorEl={moreAnchor}
          open={Boolean(moreAnchor)}
          onClose={handleMoreClose}
          transformOrigin={{
            vertical: -30,
            horizontal: "right",
          }}
        >
          {get(options, "moreMenu", []).map((item, index) =>
            isNil(item) ? null : (
              <MenuItem
                key={index}
                onClick={handleMoreClick(get(item, "onClick", () => null))}
                disabled={get(item, "disabled", false)}
              >
                {get(item, "disabled", false) && (
                  <CircularProgress
                    size={16}
                    className="margin-circular"
                    color="white"
                  />
                )}
                {get(item, "label", "")}
              </MenuItem>
            )
          )}
        </Menu>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    desireUser: desireUserSelector(state),
    desireLoading: desireLoadingSelector(state),
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state),
    profile: state.system.profile,
    room: state.room.listRoom
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionToast,
    doReloadUser: ({ userId }) => {
      dispatch(detailUser({ userId }, true));
      dispatch(listUserOfGroup(true));
    },
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
    doSearchUserReset: () => dispatch(searchUserReset()),
    doInviteUserJoinGroup: ({ userId }) =>
      dispatch(inviteUserJoinGroup({ userId })),
      doListRoom: (quite) => dispatch(listRoom(quite)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtonGroup);
