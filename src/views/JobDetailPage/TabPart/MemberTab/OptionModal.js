import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import "./styles.scss";
import {useTranslation} from "react-i18next";
import {Box, FormControl, InputBase, MenuItem, Select} from "@material-ui/core";
import CustomAvatar from "../../../../components/CustomAvatar";
import {get} from "lodash";
import {deleteMember, updateRolesForMember} from "../../../../actions/taskDetail/taskDetailActions";
import {connect} from "react-redux";
import AlertModal from "../../../../components/AlertModal";

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
    fontWeight: 400
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
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
function OptionModal({open, setOpen, member, doUpdateRoleMember, task_id, doDeleteMember}) {
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  const [modalConfirm, setModalConfirm] =  React.useState(false);

  function handleUpdateRoleMember(member_id, role_id) {
    doUpdateRoleMember({task_id, member_id, role_id});
  }
  function handleRemoveMember(member_id) {
    doDeleteMember({task_id, member_id});
    setOpen(false);
  }
  return (
    <Dialog
      disableBackdropClick={true}
      onClose={handleClose}
      open={open}
      maxWidth={"sm"}
      className={"optionModal-container"}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t("TIME_RANGE_POPOVER_OPTIONS")}
      </DialogTitle>
      <DialogContent dividers>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <CustomAvatar src={get(member, "avatar")} style={{width: 75, height: 75}}/>
          <Typography variant={"h6"} style={{marginTop: 15}}>{get(member, "name")}</Typography>
          <Button variant="outlined" color="primary" style={{marginTop: 25}} className={"btnSendMessage"}>
            {t("LABEL_SEND_MESSAGE")}
          </Button>

          <Box className={"memberInformation"}>
            <div className={"memberInformation-item"}>
              <div className={"memberInformation-itemLabel"}>{t("VIEW_OFFER_LABEL_DEPARTMENT_TITLE")}:</div>
              <div className={"memberInformation-itemValue"}>{get(member, "room")}</div>
            </div>
            <div className={"memberInformation-item"}>
              <div className={"memberInformation-itemLabel"}>{t("LABEL_CHAT_TASK_CHUC_DANH")}</div>
              <div className={"memberInformation-itemValue"}>{get(member, "position")}</div>
            </div>
            <div className={"memberInformation-item"}>
              <div className={"memberInformation-itemLabel"}>{t("LABEL_CHAT_TASK_VAI_TRO")}:</div>
              <div className={"memberInformation-itemValue"}>
                <FormControl>
                  <Select
                    input={<BootstrapInput />}
                    value={get(member, "type_assign")}
                    onChange={(evt) => handleUpdateRoleMember(member.id, evt.target.value)}
                  >
                    <MenuItem value={3}>{t("Thực hiện")}</MenuItem>
                    <MenuItem value={4}>{t("Giám sát")}</MenuItem>
                    <MenuItem value={2}>{t("LABEL_OFFER")}</MenuItem>
                    <MenuItem value={1}>{t("LABEL_ASSIGNERS")}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Box>
          <Button
            color="primary" variant="contained"
            disableElevation className={"btnLeaveWork"}
            onClick={() => setModalConfirm(true)}
          >
            {t("LABEL_OUT_WORKING")}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>{t("LABEL_CHAT_TASK_HUY")}</Button>
        <Button autoFocus onClick={handleClose} color="primary">{t("LABEL_GANTT_NAME_COMPLETE_TABLE")}</Button>
      </DialogActions>
      <AlertModal
        open={modalConfirm}
        setOpen={setModalConfirm}
        content={t('LABEL_LEAVE_TASK_CONFIRM')}
        onConfirm={() => {
          handleRemoveMember(member.id);
        }}
      />
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    task_id: state.taskDetail.commonTaskDetail.activeTaskId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doDeleteMember: (options) => dispatch(deleteMember(options)),
    doUpdateRoleMember: (options) => dispatch(updateRolesForMember(options)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionModal);