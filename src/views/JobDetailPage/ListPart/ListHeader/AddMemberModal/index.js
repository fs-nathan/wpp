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
import {filter, find, get, map, set, size, toLower, isNil, concat, differenceBy, split, last} from "lodash";
import List from "@material-ui/core/List";
import {withStyles} from '@material-ui/core/styles';
import {mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle} from '@mdi/js';
import Icon from "@mdi/react";
import Scrollbars from "react-custom-scrollbars";
import {
  createMember,
  deleteMember,
  getMemberNotAssigned,
  updateRolesForMember
} from "../../../../../actions/taskDetail/taskDetailActions";
import {CustomEventDispose, CustomEventListener} from "../../../../../constants/events";
import {EVENT_ADD_MEMBER_TO_TASK_SUCCESS} from "../../../../../constants/actions/taskDetail/taskDetailConst";
import * as taskDetailAction from "../../../../../actions/taskDetail/taskDetailActions";
import MemberSetting from "../../../../ProjectPage/Modals/MembersSetting";
import {useHistory} from "react-router-dom";

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
  doUpdateRoleMember, doCreateMember
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchPattern, setSearchPattern] = React.useState("");
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const colors = useSelector(state => state.setting.colors);
  const bgColor = find(colors, {"selected": true});
  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const _members = filter(members, function (member) {
      return toLower(member.name).includes(toLower(searchPattern));
    });
    setFilteredMembers(_members);
  }, [searchPattern, members]);

  React.useEffect(() => {
    if(!isNil(task_id) && isOpen) {
      doListMembersNotAssign({task_id});
    }
  }, [task_id, doListMembersNotAssign, isOpen]);

  function handleSelectMember(id) {
    set(selected, id, !get(selected, id, false));
    setSelected({...selected});
  }

  function handleRemoveMember(member_id) {
    doDeleteMember({task_id, member_id});
  }

  function handleUpdateRoleMember(member_id, role_id) {
    doUpdateRoleMember({task_id, member_id, role_id});
  }

  function handleAddMember(member_id) {
    doCreateMember({task_id, member_id});
  }
  function handleFilterSelect() {
    const _members = filter(members, function (member) {
      return selected.hasOwnProperty(member.id);
    });
    setFilteredMembers(_members);
  }
  React.useEffect(() => {
    const reloadAfterActionMember = () => {
      dispatch(taskDetailAction.getMember({task_id}));
      doListMembersNotAssign({task_id});
    }
    CustomEventListener(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
    return () => {
      CustomEventDispose(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
    }
  });

  members = concat(members, differenceBy(membersNotAssigned, members, "id"));

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('IDS_WP_DONE')}
      onClickSuccess={handleClose}
      maxWidth="sm" isOneButton
      className="AddMemberModal"
      scroll="body" useScrollbar={false}
    >
      <DialogContent className="AddMemberModal-container">
        <div style={{padding: "10px 15px"}}>
          <Paper component="form" elevation={0} variant={"outlined"} className={classes.root}>
            <IconButton  aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder={t("LABEL_SEARCH_MEMBERS_TO_ADD")}
              inputProps={{ 'aria-label': 'search personal board' }}
              onChange={evt => setSearchPattern(evt.currentTarget.value)}
            />
          </Paper>
          <Typography variant={"body2"} color={"textSecondary"} className={"text-hint"}>
            {t("LABEL_SEARCH_MEMBERS_TO_ADD_DES")}
          </Typography>
          <Typography>
            <Link href={"#"} onClick={() => setOpenMemberSetting(true)}>
              + {t("LABEL_ADD_MEMBER_TO_BOARD")}
            </Link>
          </Typography>
          <Box className={"AddMemberModal-btnGroup"}>
            <Chip
              clickable onClick={() => setFilteredMembers(members)}
              label={`${t("IDS_WP_ALL")} (${size(members)})`} color={"primary"}
            />
            {size(filter(selected, function (value, key) { return value;})) > 0 && (
              <Chip
                clickable onClick={() => handleFilterSelect()}
                label={`${t("GANTT_SELECTED")} (${size(filter(selected, function (value, key) { return value;}))})`}
              />
            )}
          </Box>
        </div>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <Box className={"AddMemberModal-listMembers"}>
            {map(filteredMembers, function (member) {
              return (
                <Box className={"AddMemberModal-listMembersItem"} onClick={() => {
                  if(get(member, "type_assign", "") === "") {
                    handleSelectMember(member.id);
                    handleAddMember(member.id);
                  }
                }}>
                  {get(member, "type_assign", "") !== "" && (
                    <Icon path={mdiCheckboxMarkedCircle} size={1} color={get(bgColor, "color")}/>
                  )}
                  {get(member, "type_assign", "") === "" && !selected[member.id] && (
                    <Icon className={"checkIcon"} path={mdiCheckboxBlankCircleOutline} size={1} color={"rgba(0,0,0,0.54)"}/>
                  )}
                  {get(member, "type_assign", "") === "" && selected[member.id] && (
                    <Icon path={mdiCheckboxMarkedCircle} size={1} color={get(bgColor, "color")}/>
                  )}
                  <List component={"nav"} dense={true} style={{width: "100%"}}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="memberItem--avatar" src={member.avatar} alt='avatar'/>
                      </ListItemAvatar>
                      <ListItemText primary={member.name} secondary={member.email}/>
                      <ListItemSecondaryAction>
                        {get(member, "type_assign", "") !== "" && (
                          <>
                            <FormControl className={classes.margin}>
                              <Select
                                input={<BootstrapInput />}
                                value={member.type_assign}
                                onChange={(evt) => handleUpdateRoleMember(member.id, evt.target.value)}
                              >
                                <MenuItem value={3}>{t("Thực hiện")}</MenuItem>
                                <MenuItem value={4}>{t("Giám sát")}</MenuItem>
                                <MenuItem value={2}>{t("LABEL_OFFER")}</MenuItem>
                                <MenuItem value={1}>{t("LABEL_ASSIGNERS")}</MenuItem>
                              </Select>
                            </FormControl>
                            <div className={"memberTypeAssigned"} onClick={() => handleRemoveMember(member.id)}>
                              <span>{t("LABEL_LEAVE_TASK")}</span>
                            </div>
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
      <MemberSetting open={openMemberSetting} setOpen={setOpenMemberSetting} project_id={last(split(history.location.pathname, "/"))}/>
    </DialogWrap>
  );
}

const mapStateToProps = state => {
  return {
    task_id: state.taskDetail.commonTaskDetail.activeTaskId,
    membersNotAssigned: state.taskDetail.taskMember.memberNotAssigned,
    members: state.taskDetail.taskMember.member
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListMembersNotAssign: ({task_id}) => dispatch(getMemberNotAssigned({task_id})),
    doDeleteMember: (options) => dispatch(deleteMember(options)),
    doUpdateRoleMember: (options) => dispatch(updateRolesForMember(options)),
    doCreateMember: (options) => dispatch(createMember(options)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMemberModal);