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
import { connect, useSelector } from 'react-redux';
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
const ActionsCancleButton = ({ className = '', ...props }) => <ButtonBase className={`comp_CustomModal___cancle-button ${className}`} {...props} />;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});
function ViewDetailRemind({
  open, setOpen, remind, members,
  loading = false, remindType = "PROJECT"
}) {

  const { t } = useTranslation();
  const colors = useSelector(state => state.setting.colors);
  const bgColor = colors.find(item => item.selected === true);

  function handleCancle() {
    setOpen(false);
  }

  return (
    <>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => handleCancle()}
        aria-labelledby="alert-dialog-slide-title"
        className={"comp_CustomModal"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <StyledDialogTitle id="alert-dialog-slide-title">
          <Box className="view_DetailRemind_header">
            <CustomAvatar
              style={{ width: 50, height: 50 }}
              src={get(remind, "user_create_avatar")} alt='avatar'
            />
            <Box className="view_DetailRemind_headerText">
              <Typography component={"span"}>{get(remind, "user_create_name", "")}</Typography>
              <Typography component={"span"}>PTGD - Ban lãnh đạo đã tạo lịch nhắc hẹn</Typography>
            </Box>
          </Box>
          <IconButton className="comp_CustomModal___iconButton" onClick={() => handleCancle()}>
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
                <div
                  className="view_DetailRemind_labelType"
                  style={{
                    backgroundColor: remindType === "PROJECT" ? "#FFCCC7" : "#DDC2F7"
                  }}
                >{t(`IDS_WP_${remindType}`)}</div>
                <Typography component={"p"} className="view_DetailRemind_description">{get(remind, "content")}</Typography>
                <Box className="view_DetailRemind_remindProperty">
                  <Box className="view_DetailRemind_remindProperty_header">
                    <span>{t('IDS_WP_MONTH')} {moment(get(remind, "date")).format("MM")}</span>
                    <span>{moment(get(remind, "date")).format("DD")}</span>
                  </Box>
                  <Box className="view_DetailRemind_remindProperty_content">
                    <span>{t('IDS_WP_CREATED_AT')}: {get(remind, "created_at")}</span>
                    <span>{t('IDS_WP_REMIND')}: {get(remind, "label_remind_time")}</span>
                  </Box>
                </Box>
                <Box className="view_DetailRemind_remindContent">
                  {
                    remindType === "PROJECT" && (
                      <>
                        <span>Công việc:</span>
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
                            get(remind, "members_assign", []).map((user) => {
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
          <ActionsCancleButton onClick={() => handleCancle()}>
            {t('IDS_WP_EXIT')}
          </ActionsCancleButton>
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