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
    padding: "40px",
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    marginBottom: 10,
    padding: "8px 30px",
  },
}))(MuiDialogActions);
function GuideLineAddUserModal({open, setOpen, handleAddNow, type = 1}) {
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
        <Typography variant={"h5"} style={{fontWeight: 500}}>{
          type === 1 ? t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD") : t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING")
        }</Typography>
        <Box marginTop={"10px"}>
          <Typography variant={"body1"} color={"textSecondary"}>{
            type === 1 ? t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD_DES1") : t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_DES")
          }</Typography>
          <Typography variant={"body1"} color={"textSecondary"}>
            {t("MESSAGE_GUIDELINE_ADD_MEMBER_WORKING_BOARD_DES2")}
            <Link href={type === 1 ? "https://support.workplus.vn/lam-viec/gan-thanh-vien-cho-du-an-quy-trinh-chu-de/" : "https://support.workplus.vn/lam-viec/gan-thanh-vien-tham-gia-mot-cong-viec/"} target={"_blank"}>
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