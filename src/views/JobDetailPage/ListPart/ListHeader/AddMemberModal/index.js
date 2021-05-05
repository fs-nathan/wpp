import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  FormControl,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect, useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import Link from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import {concat, filter, find, get, isNil, last, map, findIndex, size, split, toLower} from "lodash";
import List from "@material-ui/core/List";
import {withStyles} from '@material-ui/core/styles';
import {mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle} from '@mdi/js';
import Icon from "@mdi/react";
import Scrollbars from "react-custom-scrollbars";
import * as taskDetailAction from "../../../../../actions/taskDetail/taskDetailActions";
import {
  createMember,
  deleteMember, getMember,
  getMemberNotAssigned,
  updateRolesForMember
} from "../../../../../actions/taskDetail/taskDetailActions";
import {
  ADD_MEMBER_PROJECT,
  CustomEventDispose,
  CustomEventListener,
  REMOVE_MEMBER_PROJECT
} from "../../../../../constants/events";
import {EVENT_ADD_MEMBER_TO_TASK_SUCCESS} from "../../../../../constants/actions/taskDetail/taskDetailConst";
import MemberSetting from "../../../../ProjectPage/Modals/MembersSetting";
import {useHistory} from "react-router-dom";
import {listUserRole} from "../../../../../actions/userRole/listUserRole";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    width: '91%'
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 13,
    padding: '5px 26px 5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function AddMemberModal({
  setOpen, isOpen, doListMembersNotAssign, task_id, membersNotAssigned, members, doDeleteMember,
  doUpdateRoleMember, doCreateMember, doListUserRole, userRoles, task, doListMembers
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchPattern, setSearchPattern] = React.useState("");
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const colors = useSelector(state => state.setting.colors);
  const bgColor = find(colors, {"selected": true});
  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);
  const history = useHistory();
  let projectID = last(split(history.location.pathname, "/"));
  const [totalMembers, setTotalMembers] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState(0);
  const permissions = useSelector(state => state.viewPermissions.data.detailProject[projectID]);
  const [taskIDValue, setTaskIDValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  React.useEffect(() => {
    setTaskIDValue(get(task, "id", task_id));
  }, [task_id, task]);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const _members = filter(totalMembers, function (member) {
      return toLower(member.name).includes(toLower(searchPattern));
    });
    setFilteredMembers(_members);
  }, [searchPattern, totalMembers]);

  React.useEffect(() => {
    if(!isNil(taskIDValue) && isOpen) {
      doListMembersNotAssign({task_id: taskIDValue});
      doListMembers({ task_id: taskIDValue });
      doListUserRole(true);
    }
  }, [taskIDValue, doListMembersNotAssign, isOpen, doListUserRole, doListMembers]);

  function handleRemoveMember(member_id) {
    doDeleteMember({task_id: taskIDValue, member_id});
  }

  function handleUpdateRoleMember(member_id, role_id) {
    doUpdateRoleMember({task_id: taskIDValue, member_id, role_id});
  }

  function handleAddMember(member_id) {
    doCreateMember({task_id: taskIDValue, member_id});
  }

  React.useEffect(() => {
    const reloadAfterActionMember = () => {
      dispatch(taskDetailAction.getMember({task_id: taskIDValue}));
      doListMembersNotAssign({task_id});
    }
    CustomEventListener(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
    CustomEventListener(REMOVE_MEMBER_PROJECT.SUCCESS, reloadAfterActionMember);
    CustomEventListener(ADD_MEMBER_PROJECT.SUCCESS, reloadAfterActionMember);
    return () => {
      CustomEventDispose(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
      CustomEventDispose(REMOVE_MEMBER_PROJECT.SUCCESS, reloadAfterActionMember);
      CustomEventDispose(ADD_MEMBER_PROJECT.SUCCESS, reloadAfterActionMember);
    }
  });

  React.useEffect(() => {
    setTotalMembers(concat(members, membersNotAssigned));
    setFilteredMembers(concat(members, membersNotAssigned));
  }, [members, membersNotAssigned]);

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClose}
      maxWidth="sm" isOneButton
      className="AddMemberModal"
      scroll="body" useScrollbar={false}
    >
      <DialogContent className="AddMemberModal-container">
        <div style={{padding: "10px 25px"}}>
          <Paper
            component="form" elevation={0} variant={"outlined"} className={classes.root}
            style={isFocus ? {border: "2px solid var(--color-primary)"} : {}}
          >
            <IconButton  aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder={t("LABEL_SEARCH_MEMBERS_TO_ADD")}
              inputProps={{ 'aria-label': 'search personal board' }}
              onChange={evt => setSearchPattern(evt.currentTarget.value)}
              onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}
            />
          </Paper>
          <Typography variant={"body2"} color={"textSecondary"} className={"text-hint"}>
            {t("LABEL_SEARCH_MEMBERS_TO_ADD_DES")}
          </Typography>
          <Typography>
            {get(permissions, "update_project", false) && (
              <Link onClick={() => setOpenMemberSetting(true)} style={{cursor: "pointer"}}>
                + {t("LABEL_ADD_MEMBER_TO_BOARD")}
              </Link>
            )}
          </Typography>
          <Box className={"AddMemberModal-btnGroup"}>
            <Chip
              clickable onClick={() => {
                setFilteredMembers(totalMembers);
                setSelectedFilter(0);
              }}
              label={`${t("IDS_WP_ALL")} (${size(totalMembers)})`} color={selectedFilter === 0 ? "primary" : "default"}
            />
            {size(members) > 0 && (
              <Chip
                clickable onClick={() => {
                  setFilteredMembers(members);
                  setSelectedFilter(1);
                }} color={selectedFilter === 1 ? "primary" : "default"}
                label={`${t("LABEL_ASSIGNED_COUNT")} (${size(members)})`}
              />
            )}
          </Box>
        </div>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <Box className={"AddMemberModal-listMembers"}>
            {map(filteredMembers, function (member) {
              return (
                <Box className={"AddMemberModal-listMembersItem"} onClick={() => {
                  if(findIndex(membersNotAssigned, {"id": member.id}) >= 0) {
                    handleAddMember(member.id);
                  }
                }}>
                  {findIndex(members, {"id": member.id}) >= 0 && (
                    <Icon path={mdiCheckboxMarkedCircle} size={1.083} color={get(bgColor, "color")}/>
                  )}
                  {findIndex(membersNotAssigned, {"id": member.id}) >= 0 && (
                    <Icon className={"checkIcon"} path={mdiCheckboxBlankCircleOutline} size={1.083} color={"rgba(0,0,0,0.54)"}/>
                  )}
                  <List component={"nav"} dense={true} style={{width: "100%"}}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="memberItem--avatar" src={member.avatar} alt='avatar'/>
                      </ListItemAvatar>
                      <ListItemText primary={member.name} secondary={member.email}/>
                      <ListItemSecondaryAction>
                        {findIndex(members, {"id": member.id}) >= 0 && (
                          <>
                            {member.is_in_group && (
                              <FormControl className={classes.margin}>
                                <Select
                                  input={<BootstrapInput />} displayEmpty
                                  value={get(member, "role.id", "")}
                                  onChange={(evt) => handleUpdateRoleMember(member.id, evt.target.value)}
                                >
                                  {isNil(get(member, "role.id")) && (
                                    <MenuItem value={""}>{t("LABEL_SET_MEMBER_ROLE")}</MenuItem>
                                  )}
                                  {map(userRoles, function (role) {
                                    return <MenuItem value={role.id}>{role.name}</MenuItem>
                                  })}
                                </Select>
                              </FormControl>
                            )}
                            {get(member, "is_in_group") === false && <span style={{color: "red"}}>{t('LABEL_CHAT_TASK_DA_ROI_NHOM')}</span>}
                            {get(member, "can_ban") && (
                              <div className={"memberTypeAssigned"} onClick={() => handleRemoveMember(member.id)}>
                                <span>{t("LABEL_LEAVE_TASK")}</span>
                              </div>
                            )}
                          </>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Box>
              );
            })}
          </Box>
        </Scrollbars>
      </DialogContent>
      <MemberSetting open={openMemberSetting} setOpen={setOpenMemberSetting} project_id={projectID}/>
    </DialogWrap>
  );
}

const mapStateToProps = state => {
  return {
    task_id: state.taskDetail.commonTaskDetail.activeTaskId,
    membersNotAssigned: state.taskDetail.taskMember.memberNotAssigned,
    members: state.taskDetail.taskMember.member,
    userRoles: get(state.userRole.listUserRole.data, "userRoles", [])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListMembersNotAssign: ({task_id}) => dispatch(getMemberNotAssigned({task_id})),
    doDeleteMember: (options) => dispatch(deleteMember(options)),
    doUpdateRoleMember: (options) => dispatch(updateRolesForMember(options)),
    doCreateMember: (options) => dispatch(createMember(options)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doListMembers: ({task_id}) => dispatch(getMember({ task_id }))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMemberModal);