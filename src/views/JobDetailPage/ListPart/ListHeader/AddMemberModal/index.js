import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  IconButton,
  InputBase,
  ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
  makeStyles,
  Paper,
  Radio
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import Link from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import {size, map, filter, toLower} from "lodash";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    width: '91%'
  },
}));
function AddMemberModal({ setOpen, isOpen }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = React.useState("");
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const _members = filter(members, function (member) {
      return toLower(member.name).includes(toLower(searchPattern));
    });
    setFilteredMembers(_members);
  }, [searchPattern, members]);
  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClose}
      maxWidth="sm"
      isOneButton
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
          {size(selected) >0 && (<Chip label={`${t("GANTT_SELECTED")} (${size(members)})`}/>)}
        </Box>
        <Box className={"AddMemberModal-listMembers"}>
          {map(filteredMembers, function (member) {
            return (
              <Box className={"AddMemberModal-listMembersItem"}>
                  <Radio checked={false}/>
                  <List component={"nav"} dense={true}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="memberItem--avatar" src={member.avatar} alt='avatar'/>
                      </ListItemAvatar>
                      <ListItemText primary={member.name} secondary={member.email}/>
                      <ListItemSecondaryAction>

                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
              </Box>
            );
          })}

        </Box>
        {/*<GridArea component={'div'} style={{ borderBottom: 'none' }} >
          <BorderGrid component={'div'}>
            <FlexMemberProject component={'span'}>
              <Typography component={'div'} className="AddMemberModal--title" >{t('LABEL_CHAT_TASK_THANH_VIEN_DU_AN')}</Typography>
            </FlexMemberProject>
            <Typography component="span">
              <div style={{ margin: '10px 10px 0 10px' }}>
                <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_THANH_VIEN')} />
              </div>
              <div className="AddMemberModal--alert">
                <div>
                  <Icon path={mdiAlertCircleOutline} size={'15px'}/>
                </div>
                <div className="AddMemberModal--alertText">
                  {t('LABEL_CHAT_TASK_HAY_THEM_THANH_VIEN')}
                  <Typography component={"span"} style={{marginLeft: 10}}>
                    <Link href="#">{t("VIEW_OFFER_LABEL_LEARN_MORE")}</Link>
                  </Typography>
                </div>
              </div>
              <div className="table-scroll-add-member">
                <Scrollbars>
                  {
                    memberNotAssigned.map((item, key) =>
                      (
                        <ProjectMember
                          avatar={item.avatar}
                          key={item.id}
                          id={item.id}
                          name={item.name} email={item.email}
                          label={item.permission}
                        />
                      )
                    )}
                </Scrollbars>
              </div>
            </Typography>
          </BorderGrid>
          <Typography component="div">
            <FlexJobMember component="div">
              <Typography className="AddMemberModal--title" component={'div'}>{t('LABEL_CHAT_TASK_THANH_VIEN_CONG_VIEC')}</Typography>
            </FlexJobMember>
            <TableMember style={{ boxShadow: 'none' }} />
          </Typography>
        </GridArea>*/}
      </DialogContent>
    </DialogWrap>
  );
}

export default AddMemberModal;