import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlertModal from 'components/AlertModal';
import { apiService } from 'constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeFlagFetchProjectSchedules, changeMainCalendar } from "../../../actions/gantt";
const ITEM_HEIGHT = 48;

function CustomMenu({ projectId, canDelete, isMain, mainCalendar, scheduleId, changeMainCalendar, calendarPermisstions, changeFlagFetchProjectSchedules, isDefault }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false)
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { t } = useTranslation()
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null);
  };
  const assignProjectSchedule = async (projectId, scheduleId, ) => {
    try {
      const url = 'project/delete-schedules'
      const result = await apiService({
        url,
        method: 'post',
        data: {
          schedule_id: scheduleId,
          project_id: projectId
        }
      })
      changeFlagFetchProjectSchedules(true)
    } catch (e) {
      console.log(e)
    }
  }

  const setMainProjectSchedule = async (projectId, scheduleId) => {
    try {
      const url = 'project/set-main-schedules'
      const result = await apiService({
        url,
        method: 'post',
        data: {
          schedule_id: scheduleId,
          project_id: projectId
        }
      })
      changeFlagFetchProjectSchedules(true)
    } catch (e) {
      console.log(e)
    }
  }
  if (!calendarPermisstions.assign_schedule && !calendarPermisstions.edit_schedule) return null
  const checkSet = calendarPermisstions.assign_schedule && !isMain
  const chectEdit = calendarPermisstions.edit_schedule
  const checkDelte = canDelete && !isDefault && calendarPermisstions.assign_schedule
  if(!checkDelte && ! checkSet && !chectEdit) return null
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {calendarPermisstions.assign_schedule && !isMain && <MenuItem key={1} onClick={(e) => {
          e.stopPropagation()
          if (!calendarPermisstions.assign_schedule) return
          setMainProjectSchedule(projectId, scheduleId)
          changeMainCalendar(scheduleId)
          setAnchorEl(null)
        }}>
          {t('GANTT_CALENDAR_SET_MAIN_CALENDAR')}
        </MenuItem>}
        {calendarPermisstions.edit_schedule && <MenuItem key={2} onClick={() => {
          if (!calendarPermisstions.edit_schedule) return
          history.push(`/calendars/project/detail/${scheduleId}`)
        }}>
          {t('GANTT_CALENDAR_EDIT_CALENDAR')}
        </MenuItem>}
        {canDelete && !isDefault && calendarPermisstions.assign_schedule && <MenuItem key={3} onClick={(e) => {
          e.stopPropagation()
          if (mainCalendar === scheduleId) {
            SnackbarEmitter(SNACKBAR_VARIANT.ERROR, t("GANTT_CANNOT"));
            return
          }
          setOpenConfirmModal(true)
        }}>
          {t('GANTT_CALENDAR_DELETE_CALENDAR')}
        </MenuItem>}
      </Menu>
      <AlertModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => {
          if (!calendarPermisstions.edit_schedule) return
          assignProjectSchedule(projectId, scheduleId)
          setAnchorEl(null)
        }}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  fetchProjectSchedule: state.gantt.fetchProjectSchedule,
  calendarPermisstions: state.gantt.calendarPermisstions,
  mainCalendar: state.gantt.mainCalendar
})

const mapDispatchToProps = {
  changeFlagFetchProjectSchedules,
  changeMainCalendar
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu)