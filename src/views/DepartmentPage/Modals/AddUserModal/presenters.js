import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {withStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useTranslation} from "react-i18next";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import MuiDialogActions from "@material-ui/core/DialogActions";
import SearchIcon from "@material-ui/icons/Search";
import {
  Avatar,
  Box,
  CircularProgress,
  InputBase,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import {get, size} from "lodash";
import "./style.scss";
import List from "@material-ui/core/List";

const styles = (theme) => ({
  title: {
    margin: 0,
    padding: theme.spacing(2),
    background: "#F5F8FC"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  titleText: {
    textTransform: "uppercase",
    fontWeight: 400,
    color: "rgba(0,0,0,0.54)"
  }
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.title} {...other}>
      <Typography variant="h6" className={classes.titleText}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function AddUserModalPresenter({
  open, setOpen, handleSearchUser, desireUser,
  handleClearDesireUsers, handleInviteUserJoinGroup
}) {
  const {t} = useTranslation();
  const [searchPattern, setSearchPattern] = React.useState("");
  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog
      disableBackdropClick={true}
      onClose={handleClose}
      open={open}
      maxWidth={"sm"}
      className={"addMemberModal-container"}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t('DMH.VIEW.DP.RIGHT.UT.ADD_USER')}
      </DialogTitle>
      <DialogContent dividers>
        <Paper component="form" elevation={0} variant={"outlined"} className={"addMemberModal-searchBox"}>
          <IconButton  aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            className={"addMemberModal-searchBox__input"}
            placeholder={t("LABEL_SEARCH_MEMBER_TO_ADD")}
            inputProps={{ 'aria-label': 'search personal board' }}
            onChange={evt => setSearchPattern(evt.currentTarget.value)}
            value={searchPattern}
          />
        </Paper>
        <div className={"addMemberModal-noteWrapper"}>
          <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_SEARCH_MEMBER_TO_ADD_NOTE")}</Typography>
          <Typography variant={"body1"} color={"textSecondary"}>
            {t("LABEL_OR")}
            <Link href={""} style={{textTransform: "uppercase", marginLeft: 5}}>{t("LABEL_INVITE_MEMBER_REGISTRY")}</Link>
          </Typography>
        </div>
        {size(desireUser.user) > 0 && ((
          <Box className={"addMemberModal-searchResult"}>
            <Typography variant={"body1"} style={{fontWeight : 500}}>{t("Kết quả tìm kiếm")}</Typography>
            <Box className={"addMemberModal-searchResult__item"}>
              <List component={"nav"} dense={true} style={{width: "100%"}}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className="memberItem--avatar" src={get(desireUser.user, "avatar")} alt='avatar'/>
                  </ListItemAvatar>
                  <ListItemText primary={get(desireUser.user, "name")} secondary={get(desireUser.user, "email")}/>
                  <ListItemSecondaryAction>
                    <Button onClick={() => handleInviteUserJoinGroup({userId: get(desireUser.user, "id")})} variant={"contained"} disableElevation>
                      {t("IDS_WP_COMMON_ADD")}
                    </Button>
                    <Button onClick={() => {
                      setSearchPattern("");
                      handleClearDesireUsers();
                    }} variant={"outlined"} disableElevation>
                      {t('LABEL_CHAT_TASK_HUY')}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Box>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("LABEL_CHAT_TASK_HUY")}</Button>
        <Button
          autoFocus onClick={() => handleSearchUser({info: searchPattern})} color="primary"
          disabled={desireUser.loading || searchPattern === ""}
        >
          {desireUser.loading && (
            <CircularProgress
              size={16}
              className="margin-circular"
              color='white'
            />
          )}
          {t("IDS_WP_SEARCH")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserModalPresenter;