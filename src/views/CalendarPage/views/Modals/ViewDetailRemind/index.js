import { Box, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton, Typography } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import CustomAvatar from 'components/CustomAvatar';
import LoadingOverlay from 'components/LoadingOverlay';
import { get } from "lodash";
import moment from "moment";
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { membersSelector } from "./selectors";
import './style.scss';

const StyledScrollbars = ({ className = '', ...props }) =>
  <Scrollbars className={`view_DetailRemind_scrollbar`} {...props} />;

const StyledDialog = ({ className = '', ...props }) =>
  <Dialog className={"comp_CustomModal___dialog-sm"}
    {...props}
  />;
const StyledDialogTitle = ({ className = '', ...props }) => <DialogTitle className={`comp_CustomModal___dialog-title ${className}`} {...props} />;
const StyledDialogContent = ({ className = '', ...props }) => <DialogContent className={`comp_CustomModal___dialog-content ${className}`} {...props} />;
const StyledDialogActions = ({ className = '', ...props }) => <DialogActions className={`comp_CustomModal___dialog-actions ${className}`} {...props} />;
const ActionsCancelButton = ({ className = '', ...props }) => <ButtonBase className={`comp_CustomModal___cancle-button ${className}`} {...props} />;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});
function ViewDetailRemind({
  open, setOpen, remind, members,
  loading = false, remindType = "PROJECT", groupRemind
}) {

  const { t } = useTranslation();
  const [receiver, setReceiver] = React.useState([]);
  function handleCancel() {
    setOpen(false);
  }

  React.useEffect(() => {
    setReceiver(get(remind, "members_assign", []));
  }, [remind]);

  return (
    <>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => handleCancel()}
        aria-labelledby="alert-dialog-slide-title"
        className={"comp_CustomModal"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <StyledDialogTitle
          id="alert-dialog-slide-title"
          className={"view_DetailRemind_StyledDialogTitle"}
        >
          <Box className="view_DetailRemind_header">
            <CustomAvatar
              style={{ width: 40, height: 40 }}
              src={get(remind, "user_create_avatar")} alt='avatar'
            />
            <Box className="view_DetailRemind_headerText">
              <Typography component={"span"}>{get(remind, "user_create_name", "")}</Typography>
              <Typography component={"span"}>PTGD - Ban lãnh đạo {t("REMIND_DETAIL_LABEL_REMIND_CREATED")}</Typography>
            </Box>
          </Box>
          <IconButton className="comp_CustomModal___iconButton" onClick={() => handleCancel()}>
            <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
          </IconButton>
        </StyledDialogTitle>
        <LoadingOverlay
          active={loading}
          spinner
          fadeSpeed={100}
        >
          <StyledScrollbars
            autoHide
            autoHideTimeout={500}
            className="comp_CustomModal___scroll"
          >
            <StyledDialogContent>
              <Box className="view_DetailRemind_container">
                <Typography component={"p"} className="view_DetailRemind_description">{get(remind, "content")}</Typography>
                <Box className="view_DetailRemind_remindProperty">
                  <Box className="view_DetailRemind_remindProperty_header">
                    <span>{t('IDS_WP_MONTH')} {moment(get(remind, "date")).format("MM")}</span>
                    <span>{moment(get(remind, "date")).format("DD")}</span>
                  </Box>
                  <Box className="view_DetailRemind_remindProperty_content">
                    <span>{t('IDS_WP_CREATED_AT')}: {get(remind, "created_at")}</span>
                    <span>{t('IDS_WP_REMIND')}: {get(remind, "label_remind_time")}</span>
                    {
                      remindType === "PERSONAL" && (
                        <span style={{ background: get(groupRemind, 'color') }}>{get(groupRemind, 'name', '')}</span>
                      )
                    }
                  </Box>
                </Box>
                <Box className="view_DetailRemind_remindContent">
                  {
                    remindType === "PROJECT" && (
                      <>
                        <span>{t("Công việc")}:</span>
                        <Typography component={"p"}>Lap ke hoach kinh doanh mua san pham ABC cho muc dich XYZ</Typography>
                      </>
                    )
                  }
                  {
                    remindType === "PERSONAL" && (
                      <>
                        <span>{t('views.calendar_page.modal.create_weekly_calendar.receiver')}:</span>
                        <Box className="view_DetailRemind_userAssignBox">
                          {
                            receiver.length >= get(members, 'members', []).length && (
                              <Box className="view_DetailRemind_userAssignAll">All</Box>
                            )
                          }
                          {
                            receiver.length < get(members, 'members', []).length && (
                              receiver.map((user) => {
                                return (
                                  <Box className="view_DetailRemind_userAssignItem">
                                    <CustomAvatar
                                      style={{ width: 20, height: 20 }}
                                      src={user.avatar} alt='avatar'
                                    />
                                    <span>{user.name}</span>
                                  </Box>
                                )
                              })
                            )
                          }
                        </Box>
                      </>
                    )
                  }
                </Box>
              </Box>
            </StyledDialogContent>
          </StyledScrollbars>
        </LoadingOverlay>
        <StyledDialogActions>
          <ActionsCancelButton onClick={() => handleCancel()}>
            {t('IDS_WP_EXIT')}
          </ActionsCancelButton>
        </StyledDialogActions>
      </StyledDialog>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  state => ({
    members: membersSelector(state)
  }),
  mapDispatchToProps
)(ViewDetailRemind);