import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import {
  Avatar,
  Box,
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
import CustomModal from "../../../../components/CustomModal";

function AddUserModalPresenter({
  open, setOpen, handleSearchUser, desireUser,
  handleClearDesireUsers, handleInviteUserJoinGroup
}) {
  const {t} = useTranslation();
  const [searchPattern, setSearchPattern] = React.useState("");
  return (
    <CustomModal
      open={open} setOpen={setOpen} onCancle={() => setOpen(false)}
      canConfirm={searchPattern !== ""}
      activeLoading={desireUser.loading}
      title={t('DMH.VIEW.DP.RIGHT.UT.ADD_USER')}
      confirmRender={() => t("IDS_WP_SEARCH")}
      onConfirm={() => handleSearchUser({info: searchPattern})}
      height={"miniWide"}
      manualClose={true}
    >
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
    </CustomModal>
  );
}

export default AddUserModalPresenter;