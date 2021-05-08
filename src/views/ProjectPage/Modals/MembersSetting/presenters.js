import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItemText,
  ListSubheader,
  Menu,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import {mdiAccountMinusOutline, mdiDotsVertical, mdiFlash, mdiMenuDown} from '@mdi/js';
import Icon from '@mdi/react';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from 'components/CustomAvatar';
import {Primary, Secondary, StyledList, StyledListItem} from 'components/CustomList';
import CustomModal from 'components/CustomModal';
import SearchInput from 'components/SearchInput';
import {
  ADD_MEMBER_PROJECT,
  ADD_PROJECT_ROLE_TO_MEMBER,
  ASSIGN_MEMBER_TO_ALL_TASK,
  CustomEventDispose,
  CustomEventListener,
  MEMBER_PROJECT,
  REMOVE_MEMBER_PROJECT,
  REMOVE_PROJECT_ROLE_FROM_MEMBER,
  UPDATE_STATE_JOIN_TASK
} from 'constants/events';
import {get, size} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './style.scss';
import ModalCreateAccount from "../../../../components/CustomTable/Modal/create-account";
import CreateAccountModal from "../../../DepartmentPage/Modals/CreateAccount";
import AddUserModal from "../../../DepartmentPage/Modals/AddUserModal";
import ModalContinueCreateAccount from "../../../../components/CustomTable/Modal/continue-create-account";
import ModalUplaodExcel from "../../../../components/CustomTable/Modal/uploadExcel";
import ModalResultCreateAccount from "../../../../components/CustomTable/Modal/result-create-account";
import {useDispatch} from "react-redux";

const ListContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___list-container ${className}`}
    {...props}
  />;

const StyledListSubheader = ({ className = '', ...props }) =>
  <ListSubheader
    className={`view_Project_MemberSetting_Modal___list-subheader ${className}`}
    {...props}
  />;

const CustomListItem = ({ className = '', ...props }) =>
  <StyledListItem
    className={`view_Project_MemberSetting_Modal___list-item ${className}`}
    {...props}
  />;

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___banner ${className}`}
    {...props}
  />;

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead
    className={`view_Project_MemberSetting_Modal___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = TableBody;

const UserTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___table-cell ${className}`}
    {...props}
  />;

const HeaderTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___header-table-cell ${className}`}
    {...props}
  />;

const AvatarTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Project_MemberSetting_Modal___avatar-table-cell ${className}`}
    {...props}
  />;

const StyledRow = ({ className = '', ...props }) =>
  <TableRow
    className={`view_Project_MemberSetting_Modal___table-row ${className}`}
    {...props}
  />

const RolesBox = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___roles-box ${className}`}
    {...props}
  />;

const AddButton = ({ className = '', disabled, ...props }) =>
  <Button
    variant="outlined"
    className={`${disabled
      ? 'view_Project_MemberSetting_Modal___add-button-disabled'
      : 'view_Project_MemberSetting_Modal___add-button'} ${className}`}
    disabled={disabled}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_Project_MemberSetting_Modal___primary ${className}`}
    {...props}
  />;

const StyledSecondary = ({ className = '', ...props }) =>
  <Secondary
    className={`view_Project_MemberSetting_Modal___secondary ${className}`}
    {...props}
  />;

const LeftContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___left-container ${className}`}
    {...props}
  />;

const RightContainer = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___right-container ${className}`}
    {...props}
  />;

const RightHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Project_MemberSetting_Modal___right-header ${className}`}
    {...props}
  />


const CustomList = ({ className = '', ...props }) =>
  <StyledList
    className={`view_Project_MemberSetting_Modal___list ${className}`}
    {...props}
  />

const PermissionBox = ({ className = '', isAdmin = false, isNotEmpty = true, ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___permission-box${isAdmin ? '-admin' : ''}${isNotEmpty ? '' : '-empty'} ${className}`}
    {...props}
  />

const HelperText = ({ className = '', ...props }) =>
  <div
    className={`view_Project_MemberSetting_Modal___helper ${className}`}
    {...props}
  />

function UserFreeRoomList({
  room, loading,
  onAddMember
}) {

  const { t } = useTranslation();

  if (get(room, 'users', []).length > 0)
    return (
      <CustomList
        component="nav"
        aria-labelledby={`list-subheader-${get(room, 'id')}`}
        subheader={
          <StyledListSubheader component="div" id={`list-subheader-${get(room, 'id')}`}>
            <ColorTypo uppercase bold>{get(room, 'name', '')}</ColorTypo>
          </StyledListSubheader>
        }
      >
        {get(room, 'users', []).map(user => (
          <CustomListItem
            key={get(user, 'id')}
          >
            <CustomAvatar src={get(user, 'avatar', '')} alt='avatar' />
            <ListItemText
              primary={
                <StyledPrimary>
                  <abbr title={get(user, 'name', '')}>
                    <div className={"view_Project_MemberSetting_Modal__textShorten"}>
                      {get(user, 'name', '')}
                    </div>
                  </abbr>
                </StyledPrimary>
              }
              secondaryTypographyProps={{ component: 'div' }}
              secondary={
                <StyledSecondary>
                  <abbr title={get(user, 'email', '')}>
                    <div className={"view_Project_MemberSetting_Modal__textShorten"}>
                      {get(user, 'email', '')}
                    </div>
                  </abbr>
                </StyledSecondary>
              }
            />
            <AddButton
              onClick={evt => onAddMember(user)}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  size={16}
                  className="margin-circular"
                  color="white"
                />
              )}
              {t("DMH.VIEW.PP.MODAL.MEMBER.RIGHT.LABEL.ADD")}
            </AddButton>
          </CustomListItem>
        ))}
      </CustomList>
    );
  else return null;
}

const SettingButton = ({
  member,
  setAnchorEl, setCurMemberSetting,
}) => {

  return (
    <div onClick={evt => evt.stopPropagation()} style={{marginRight: "20px"}}>
      <IconButton aria-controls="simple-menu" aria-haspopup="true"
        onClick={evt => {
          setAnchorEl(evt.currentTarget);
          setCurMemberSetting(member);
        }}
        size='small'
      >
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)' />
      </IconButton>
    </div>
  );
}

function MemberSetting({
  open, setOpen,
  searchPatern, setSearchPatern,
  members, addMember,
  handleAddMember, handleRemoveMember,
  handleUpdateStateJoinTask,
  handleAssignMemberToAllTask,
  handleOpenModal,
  projectId,
  doReloadMember,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curMemberSetting, setCurMemberSetting] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [anchorAssign, setAnchorAssign] = React.useState(null);
  const { t } = useTranslation();
  const [openModalAddMembers, setOpenModalAddMember] = React.useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] = React.useState(false);
  const [openAddUSerModal, setOpenAddUserModal] = React.useState(false);
  const [openContinueCreateAccount,setOpenContinueCreateAccount] = React.useState(false);
  const [openUploadExcel, setOpenUploadExcel] = React.useState(false);
  const [result,setResult] = React.useState(null);
  const [openResultCreateAccount, setOpenResultCreateAccount] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setLoading(false);
    };
    CustomEventListener(ADD_MEMBER_PROJECT.SUCCESS, doReloadMember);
    CustomEventListener(REMOVE_MEMBER_PROJECT.SUCCESS, doReloadMember);
    CustomEventListener(UPDATE_STATE_JOIN_TASK.SUCCESS, doReloadMember);
    CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK.SUCCESS, doReloadMember);
    CustomEventListener(ADD_MEMBER_PROJECT.FAIL, fail);
    CustomEventListener(REMOVE_MEMBER_PROJECT.FAIL, fail);
    CustomEventListener(UPDATE_STATE_JOIN_TASK.FAIL, fail);
    CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER.FAIL, fail);
    CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER.FAIL, fail);
    CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK.FAIL, fail);
    return () => {
      CustomEventDispose(ADD_MEMBER_PROJECT.SUCCESS, doReloadMember);
      CustomEventDispose(REMOVE_MEMBER_PROJECT.SUCCESS, doReloadMember);
      CustomEventDispose(UPDATE_STATE_JOIN_TASK.SUCCESS, doReloadMember);
      CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK.SUCCESS, doReloadMember);
      CustomEventDispose(ADD_MEMBER_PROJECT.FAIL, fail);
      CustomEventDispose(REMOVE_MEMBER_PROJECT.FAIL, fail);
      CustomEventDispose(UPDATE_STATE_JOIN_TASK.FAIL, fail);
      CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER.FAIL, fail);
      CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER.FAIL, fail);
      CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId]);

  React.useEffect(() => {
    const success = () => {
      setLoading(false);
    };
    const fail = () => {
      setLoading(false);
    };
    CustomEventListener(MEMBER_PROJECT.SUCCESS, success);
    CustomEventListener(MEMBER_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(MEMBER_PROJECT.SUCCESS, success);
      CustomEventDispose(MEMBER_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId]);

  return (
    <>
      <CustomModal
        className={'view_Project_MemberSetting_Modal___wide-modal'}
        title={t("DMH.VIEW.PP.MODAL.MEMBER.TITLE")}
        fullWidth={true}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        onConfirm={() => null}
        cancleRender={() => t("DMH.VIEW.PP.MODAL.MEMBER.EXIT")}
        height='tall'
        maxWidth='lg'
        columns={2}
        loading={members.loading || loading}
        left={{
          title: () => null,
          content: () =>
            <LeftContainer>
              <Banner>
                <Button
                  variant={"contained"} color={"primary"} disableElevation
                  className={"view_Project_MemberSetting_Modal___buttonAddMembers"}
                  onClick={() => {
                    setOpenModalAddMember(true);
                  }}
                >
                  {t("LABEL_CHAT_TASK_THEM_THANH_VIEN")}
                </Button>
                <HelperText>
                  <span>{t("DMH.VIEW.PP.MODAL.MEMBER.LEFT.HELPER")}</span>
                </HelperText>
                <SearchInput
                  fullWidth
                  placeholder={t("DMH.VIEW.PP.MODAL.MEMBER.LEFT.SEARCH")}
                  value={searchPatern} style={{background: "#fff"}}
                  onChange={evt => setSearchPatern(evt.target.value)}
                />
              </Banner>
              <ListContainer>
                {members.free.map(room => (
                  <UserFreeRoomList
                    room={room}
                    key={get(room, 'id')}
                    onAddMember={handleAddMember}
                    loading={addMember.loading}
                  />
                ))}
              </ListContainer>
            </LeftContainer>,
        }}
        right={{
          title: () => null,
          content: () =>
            <RightContainer>
              <RightHeader>
                {t("LABEL_WORKING_BOARD_MEMBERS")}
                <Typography variant={"body2"} color={"secondary"} style={{marginTop: "5px"}}>
                  {t("LABEL_WORKING_BOARD_MEMBERS_ADDED_COUNT", {count: size(members.added)})}
                </Typography>
              </RightHeader>
              <Table>
                <StyledTableHead>
                  <StyledRow>
                    <AvatarTableCell/>
                    <HeaderTableCell>{t("DMH.VIEW.PP.MODAL.MEMBER.RIGHT.TABLE.MEM")}</HeaderTableCell>
                    <HeaderTableCell>{t("DMH.VIEW.PP.MODAL.MEMBER.RIGHT.TABLE.ROL")}</HeaderTableCell>
                    <HeaderTableCell>{t("DMH.VIEW.PP.MODAL.MEMBER.RIGHT.TABLE.STA")}</HeaderTableCell>
                    <HeaderTableCell/>
                  </StyledRow>
                </StyledTableHead>
                <StyledTableBody>
                  {members.added.map(member => (
                    <StyledRow key={get(member, 'id')}>
                      <AvatarTableCell width='5%'>
                        <CustomAvatar style={{ width: 30, height: 30, }} src={get(member, 'avatar')} alt='avatar' />
                      </AvatarTableCell>
                      <UserTableCell width='25%'>
                        <span>{get(member, 'name', '')}</span>
                        <small>{get(member, 'email', '')}</small>
                      </UserTableCell>
                      <TableCell width='25%'>
                        {get(member, 'is_in_group', false) &&
                        <abbr title={get(member, "role.name", t("LABEL_SET_MEMBER_ROLE"))} style={{textDecoration: "none"}}>
                          <RolesBox onClick={() => handleOpenModal('ROLE', {curMemberId: get(member, 'id')})}>
                            <span>{get(member, "role.name", t("LABEL_SET_MEMBER_ROLE"))}</span>
                            <Icon path={mdiMenuDown} size={0.8} color={'#222'} />
                          </RolesBox>
                        </abbr>
                        }
                      </TableCell>
                      <TableCell width='25%'>
                        {get(member, 'is_in_group', false)
                          ? <RolesBox onClick={(evt) => {
                            setCurMemberSetting(member);
                            setAnchorAssign(evt.currentTarget);
                          }}>
                            <span>{get(member, 'join_task_status_code') === 1 ? t("LABEL_AUTO") : t("LABEL_MANUAL")}</span>
                            <Icon path={mdiMenuDown} size={0.8} color={'#222'} />
                          </RolesBox>
                          : <span style={{ color: 'red' }}>{t("DMH.VIEW.PP.MODAL.MEMBER.RIGHT.LABEL.LEA")}</span>}
                      </TableCell>
                      <TableCell width='5%'>
                        <SettingButton
                          member={member}
                          setAnchorEl={setAnchorEl}
                          setCurMemberSetting={setCurMemberSetting}
                        />
                      </TableCell>
                    </StyledRow>
                  ))}
                </StyledTableBody>
              </Table>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={evt => setAnchorEl(null)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: -70, horizontal: "right"}}
                className={"memberWorkingBoard-moreSetting"}
              >
                {get(curMemberSetting, "is_in_group", false) && (
                  <Box className={"memberWorkingBoard-moreSetting-item"}>
                    <Box className={"memberWorkingBoard-moreSetting-item__Header"}>
                      <Icon path={mdiFlash} size={1} color={"rgba(0,0,0,0.54)"}/>
                      <Typography variant={"h6"}>{t("LABEL_QUICK_WORKING_ASSIGN")}</Typography>
                    </Box>
                    <Box className={"memberWorkingBoard-moreSetting-item__Body"}>
                      <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_QUICK_WORKING_ASSIGN_DES")}</Typography>
                      <Button
                        color="primary" variant={"contained"} disableElevation
                        onClick={() => {
                          setAnchorEl(null);
                          handleAssignMemberToAllTask(curMemberSetting);
                        }}
                      >
                        {t("LABEL_QUICK_ASSIGN")}
                      </Button>
                    </Box>
                  </Box>
                )}
                {get(curMemberSetting, "can_ban", false) && (
                  <Box className={"memberWorkingBoard-moreSetting-item"}>
                    <Box className={"memberWorkingBoard-moreSetting-item__Header"}>
                      <Icon path={mdiAccountMinusOutline} size={1} color={"rgba(0,0,0,0.54)"}/>
                      <Typography variant={"h6"}>{t("LABEL_CHAT_TASK_LOAI_TRU")}</Typography>
                    </Box>
                    <Box className={"memberWorkingBoard-moreSetting-item__Body"}>
                      <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_REMOVE_MEMBER_WORKING_BOARD_DES")}</Typography>
                      <Button
                        color={"secondary"} variant={"contained"} disableElevation
                        onClick={() => {
                          setAnchorEl(null);
                          handleRemoveMember(curMemberSetting);
                        }}
                      >
                        {t("LABEL_DELETE")}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Menu>
              <Menu
                anchorEl={anchorAssign}
                keepMounted
                open={Boolean(anchorAssign)}
                onClose={evt => setAnchorAssign(null)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: -45, horizontal: "right"}}
                className={"memberWorkingBoard-moreSetting"}
              >
                <Typography variant={"h6"} style={{marginLeft: 7}}>
                  {t("LABEL_CHAT_TASK_HINH_THUC_GIAO_VIEC")}
                </Typography>
                <Box className={"memberWorkingBoard-moreSetting-item"}>
                  <Box className={"memberWorkingBoard-moreSetting-item__Header"}>
                    <Radio
                      checked={get(curMemberSetting, "join_task_status_code") === 1}
                      style={{marginRight: 0}}
                      onChange={() => {
                        setAnchorAssign(null);
                        handleUpdateStateJoinTask(curMemberSetting, 1);
                      }}
                    />
                    <Typography variant={"h6"}>{t("LABEL_AUTO")}</Typography>
                  </Box>
                  <Box className={"memberWorkingBoard-moreSetting-item__Body"} style={{marginLeft: 37}}>
                    <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_ASSIGN_AUTO_DES")}</Typography>
                  </Box>
                </Box>
                <Box className={"memberWorkingBoard-moreSetting-item"}>
                  <Box className={"memberWorkingBoard-moreSetting-item__Header"}>
                    <Radio
                      checked={get(curMemberSetting, "join_task_status_code") === 0} style={{marginRight: 0}}
                      onChange={() => {
                        setAnchorAssign(null);
                        handleUpdateStateJoinTask(curMemberSetting, 0);
                      }}
                    />
                    <Typography variant={"h6"}>{t("LABEL_MANUAL")}</Typography>
                  </Box>
                  <Box className={"memberWorkingBoard-moreSetting-item__Body"} style={{marginLeft: 37}}>
                    <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_ASSIGN_MANUAL_DES")}</Typography>
                  </Box>
                </Box>
              </Menu>
            </RightContainer>,
        }}
      />
      <ModalCreateAccount
        setOpenAddMember={setOpenModalAddMember}
        openAddMember={openModalAddMembers}
        setOpen={setOpenAddUserModal}
        setOpenCreateAccount={setOpenContinueCreateAccount}
      />
      <AddUserModal setOpen={setOpenAddUserModal} open={openAddUSerModal} reload={true} projectId={projectId}/>
      <CreateAccountModal open={openCreateAccountModal} setOpen={setOpenCreateAccountModal} />
      <ModalContinueCreateAccount  setResult={setResult} setOpenResultCreateAccount={setOpenResultCreateAccount}  openContinueCreateAccount={openContinueCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount} setOpenUploadExcel={setOpenUploadExcel}/>
      <ModalUplaodExcel openUploadExcel={openUploadExcel} setOpenUploadExcel={setOpenUploadExcel} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>
      <ModalResultCreateAccount result={result} openResultCreateAccount={openResultCreateAccount} setOpenResultCreateAccount={setOpenResultCreateAccount} />
    </>
  )
}

export default MemberSetting;
