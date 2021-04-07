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
import {useSelector} from 'react-redux';
import './styles.scss';
import Link from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import {filter, get, map, set, size, toLower} from "lodash";
import List from "@material-ui/core/List";
import {withStyles} from '@material-ui/core/styles';
import {mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle} from '@mdi/js';
import Icon from "@mdi/react";

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

function AddMemberModal({ setOpen, isOpen }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = React.useState("");
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const [selected, setSelected] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const _members = filter(members, function (member) {
      return toLower(member.name).includes(toLower(searchPattern));
    });
    setFilteredMembers(_members);
  }, [searchPattern, members]);
  function handleSelectMember(id) {
    set(selected, id, !get(selected, id, false));
    setSelected({...selected});
  }
  function renderTypeAssign(type) {
    switch (type) {
      case 1:
        return t("LABEL_ASSIGNERS");
      case 2:
        return t("LABEL_OFFER");
      case 3:
        return t("Thực hiện");
      case 4:
        return t("Giám sát");
      default: return;
    }
  }
  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('IDS_WP_DONE')}
      onClickSuccess={handleClose}
      maxWidth="sm"
      className="AddMemberModal"
      scroll="body"
    >
      <DialogContent className="AddMemberModal-container">
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
          <Link href="#" onClick={() => null}>
            + {t("DMH.VIEW.PP.LEFT.PM.ADD")}
          </Link>
        </Typography>
        <Box className={"AddMemberModal-btnGroup"}>
          <Chip label={`${t("IDS_WP_ALL")} (${size(members)})`} color={"primary"}/>
          {size(filter(selected, function (value, key) { return value;})) > 0 && (
            <Chip label={`${t("GANTT_SELECTED")} (${size(filter(selected, function (value, key) { return value;}))})`}/>
          )}
        </Box>
        <Box className={"AddMemberModal-listMembers"}>
          {map(filteredMembers, function (member) {
            return (
              <Box className={"AddMemberModal-listMembersItem"}>
                {get(member, "type_assign", "") !== "" && (
                  <Icon path={mdiCheckboxMarkedCircle} size={1} color={"#A2CDFF"}/>
                )}
                {get(member, "type_assign", "") === "" && !selected[member.id] && (
                  <Icon path={mdiCheckboxBlankCircleOutline} size={1} color={"rgba(0,0,0,0.54)"}/>
                )}
                  <List component={"nav"} dense={true} style={{width: "100%"}}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="memberItem--avatar" src={member.avatar} alt='avatar'/>
                      </ListItemAvatar>
                      <ListItemText primary={member.name} secondary={member.email}/>
                      <ListItemSecondaryAction>
                        {get(member, "type_assign", "") === "" && (
                          <FormControl className={classes.margin}>
                            <Select
                              input={<BootstrapInput />}
                              value={3}
                            >
                              <MenuItem value={3}>{t("Thực hiện")}</MenuItem>
                              <MenuItem value={4}>{t("Giám sát")}</MenuItem>
                              <MenuItem value={2}>{t("LABEL_OFFER")}</MenuItem>
                              <MenuItem value={1}>{t("LABEL_ASSIGNERS")}</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                        <div className={"memberTypeAssigned"}>
                          <span>{renderTypeAssign(member.type_assign)}</span>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </DialogWrap>
  );
}

export default AddMemberModal;