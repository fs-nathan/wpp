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
import { listUserFilterOfGroupSuccess, listUserOfGroup,listUserOfGroupSuccess } from "actions/user/listUserOfGroup";
import { DETAIL_USER } from "constants/actions/user/detailUser";
import { LIST_USER_OF_GROUP } from "constants/actions/user/listUserOfGroup";
import { UPDATE_USER } from "constants/actions/user/updateUser";
import MySelect from "components/MySelect";
import ModalOptionCreateAccount from '../Modal/optionCreateAccount';
import { actionToast } from "actions/system/system";
import ModalCreateAccount from "../Modal/create-account";
import ModalContinueCreateAccount from "../Modal/continue-create-account"
import ModalUplaodExcel from "../Modal/uploadExcel";
import ModalResultCreateAccount from "../Modal/result-create-account";
import { LensTwoTone } from "@material-ui/icons";
import { filterUserOfRoomSuccess, getUserOfRoom, getUserOfRoomSuccess } from "actions/room/getUserOfRoom";

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
  room,
  listUser,
  userGroup
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
  const [valueFilter,setValueFilter] = React.useState('all');
  const [openResultCreateAccount, setOpenResultCreateAccount] = React.useState(
    false
  );
  const [roomList, setRoomList] = React.useState(null);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [userJoin,setUserJoin] = React.useState(null);
  const [userInternal,setUserInternal] = React.useState(null);
  const [userJoinGroup,setUserJoinGroup] = React.useState(null);
  const [userInternalGroup,setUserInternalGroup] = React.useState(null);
  const [countAllUser,setCountAllUser] = React.useState(0);
  const [countJoinUser,setCountJoinUser] = React.useState(0);
  const [countInternalUser,setCountInternalUser] = React.useState(0);
  const [countAllUserGroup,setCountAllUserGroup] = React.useState(0);
  const [countJoinUserGroup,setCountJoinUserGroup] = React.useState(0);
  const [countInternalUserGroup,setCountInternalUserGroup] = React.useState(0);

  const [activeMask, setActiveMask] = React.useState(-1);
  const [
    openContinueCreateAccount,
    setOpenContinueCreateAccount,
  ] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [result, setResult] = React.useState(null);
 
  const dispatch = useDispatch();
  let fileInputRef = React.useRef();

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

 

  const handleFilterAll = (event) => {
    setAnchorEl(event.currentTarget);
    let countAll = 0;
    if(listUser){
      // eslint-disable-next-line no-unused-expressions
      listUser?.data?.rooms?.map((el,index) => {
        countAll = countAll + el.number_member;
      
      return null;
     })
     setCountAllUser(countAll);
    }

    const newList = listUser?.data?.rooms?.map(el => {
      
      return {...el,users: el?.users?.filter(item => item.user_type === 3)}
     });
     let countJoin = 0;
     // eslint-disable-next-line no-unused-expressions
     newList?.map((el,index) => {
      countJoin = countJoin + el?.users?.length;
      
      return null;
     })
     setCountJoinUser(countJoin);
     setUserJoin(newList);
     let countInternal = 0;
     const internal = listUser?.data?.rooms?.map(el => {
      return {...el,users: el?.users?.filter(item => item.user_type === 2)}
     });
     // eslint-disable-next-line no-unused-expressions
     internal?.map((el,index) => {
      countInternal = countInternal + el.users.length;
      
      return null;
     })
     setCountInternalUser(countInternal);
     setUserInternal(internal);
  };

  const handleFilterGroup = (event) => {
    setAnchorEl(event.currentTarget);
    let countAll = 0;
    if(userGroup){
      // eslint-disable-next-line no-unused-expressions
        countAll = countAll + userGroup?.data?.users?.length;
    }
    setCountAllUserGroup(countAll);
    const newList = userGroup?.data?.users?.filter(el => el.user_type === 3);
     let countJoin = 0;
     // eslint-disable-next-line no-unused-expressions
      countJoin = countJoin + newList.length;
      
     setCountJoinUserGroup(countJoin);
     setUserJoinGroup(newList);
     let countInternal = 0;
     const internal = userGroup?.data?.users?.filter(el => el.user_type ===  2);
     // eslint-disable-next-line no-unused-expressions
      countInternal = countInternal + internal.length;
     setCountInternalUserGroup(countInternal);
     setUserInternalGroup(internal);
  }
  const handleClose = () => {
    setAnchorEl(null);
    setCountInternalUser(0);
    setCountJoinUser(0);
    setCountAllUser(0);
  };
  
  
 
  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const handleChangeFilter = (e) => {
    setValueFilter(e.target.value)
    switch (e.target.value) {
      case 'all':
        dispatch(listUserOfGroup(true));
        return ;
        
      case 'join':
        (dispatch(listUserFilterOfGroupSuccess({rooms: userJoin, maxUser: 20})))
        return ;
        case 'internal':
          (dispatch(listUserFilterOfGroupSuccess({rooms: userInternal, maxUser: 20})));
        return ;
        default:
        break;
    }
     
     
  }
  const handleChangeFilterGroup = (e) => {
    setValueFilter(e.target.value)
    switch (e.target.value) {
      case 'all':
        (dispatch(getUserOfRoom({roomId: userGroup?.data?.users[0]?.room}, true)));
        return ;
        
      case 'join':
        (dispatch(filterUserOfRoomSuccess({users: userJoinGroup})))
        return ;
        case 'internal':
          dispatch(filterUserOfRoomSuccess({users: userInternalGroup}));
        return ;
        default:
        break;
    }
     
     
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

const handlesetFileExcel = (file) => {
  setFileExcel(file);
}
   
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
            <ModalCreateAccount openAddMember={openAddMember} setOpenAddMember={setOpenAddMember} setOpen={setOpen} setOpenCreateAccount={setOpenCreateAccount} />
            <ModalContinueCreateAccount  setOpenResultCreateAccount={setOpenResultCreateAccount} setResult={setResult} openContinueCreateAccount={openContinueCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount} setOpenUploadExcel={setOpenUploadExcel} />


            <ModalOptionCreateAccount openCreateAccount={openCreateAccount} setOpenCreateAccount={setOpenCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>


            <AddUserModalPresenter
              open={open}
              setOpen={setOpen}
              handleSearchUser={doSearchUser}
              desireUser={desireUser}
              handleClearDesireUsers={() => resetDesireUser()}
              handleInviteUserJoinGroup={doInviteUserJoinGroup}
            />

            {/* modalOpenUploadExcel */}
            <ModalUplaodExcel openUploadExcel={openUploadExcel} setOpenUploadExcel={setOpenUploadExcel} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>


            <ModalResultCreateAccount  result={result} openResultCreateAccount={openResultCreateAccount} setOpenResultCreateAccount={setOpenResultCreateAccount} />
            {/* modal_result_create_account */}

          </div>
        )}
        {get(options, "filter") && (
          <div>
          <StyledButton
          onClick={get(options, "filter.option") === 'all'? handleFilterAll : handleFilterGroup}
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
            {get(options, "filter.label") && valueFilter === 'all' ? t('IDS_WP_ALL'): valueFilter === 'join' ? t('IDS_WP_ACCOUNT_MEMBER_JOIN'): t('IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED_INTERNAL')}
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
        <RadioGroup value={valueFilter}  aria-label="gender" name="gender1" value={valueFilter} onChange={get(options, "filter.option") === 'all'? handleChangeFilter:handleChangeFilterGroup}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="all" control={<Radio />} label={t('IDS_WP_ALL')} /> <div>{get(options, "filter.option") === 'all'? countAllUser : countAllUserGroup}</div></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="join" control={<Radio />} label={t('IDS_WP_ACCOUNT_MEMBER_JOIN')} /><div>{get(options, "filter.option") === 'all'? countJoinUser: countJoinUserGroup}</div></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel value="internal" control={<Radio />} label={t('IDS_WP_ACCOUNT_INTERNAL_RESULT_CREATE_ACCOUNT_CREATED_INTERNAL')} /><div>{get(options, "filter.option") === 'all'?countInternalUser:countInternalUserGroup}</div></div>
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
    room: state.room.listRoom,
    listUser: state.user.listUserOfGroup,
    userGroup: state.room.getUserOfRoom
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
