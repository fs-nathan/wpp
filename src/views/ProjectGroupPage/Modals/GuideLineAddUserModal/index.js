import React from "react";
import {Box, Dialog, Link, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {useTranslation} from "react-i18next";
import * as images from "assets";
import "./styles.scss";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    marginBottom: 10,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
function GuideLineAddUserModal({open, setOpen, handleAddNow}) {
  const {t} = useTranslation();
  function handleAddUser() {
    setOpen(false);
    handleAddNow();
  }
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={"GuildLineAddUserModal"}
    >
      <DialogContent>
        <Typography variant={"h5"}>{t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD")}</Typography>
        <Box marginTop={"10px"}>
          <Typography variant={"body1"} color={"textSecondary"}>{t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD_DES1")}</Typography>
          <Typography variant={"body1"} color={"textSecondary"}>
            {t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD_DES2")}
            <Link href={"https://support.workplus.vn/lam-viec/gan-thanh-vien-cho-du-an-quy-trinh-chu-de/"} target={"_blank"}>
              {t("LABEL_CHAT_TASK_XEM_THEM")}
            </Link>
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} marginTop={"10px"}>
          <img src={images.add_user_group} alt={""} width={250}/>
          <Box className={"GuildLineAddUserModal-addButton"}>
            <AddIcon htmlColor={"rgba(0,0,0,0.54)"}/>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t("LABEL_SKIP")}</Button>
        <Button onClick={() => handleAddUser()} color="primary">{t("LABEL_SET_NOW")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuideLineAddUserModal;