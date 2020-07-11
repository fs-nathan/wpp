import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { apiService } from 'constants/axiosInstance';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeFlagFetchProjectSchedules, changeMainCalendar } from "../../../actions/gantt";


const ITEM_HEIGHT = 48;

function CustomMenu({ projectId, scheduleId, changeMainCalendar, calendarPermisstions, changeFlagFetchProjectSchedules, isDefault }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const assignProjectSchedule = async (projectId, scheduleId,) => {
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
    } catch (e) {
      console.log(e)
    }
  }
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
        {calendarPermisstions.edit_schedule && !calendarPermisstions.is_main && <MenuItem key={1} onClick={(e) => {
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
        {!isDefault && calendarPermisstions.edit_schedule && <MenuItem key={3} onClick={(e) => {
          e.stopPropagation()
          if (!calendarPermisstions.edit_schedule) return
          assignProjectSchedule(projectId, scheduleId)
          setAnchorEl(null)
        }}>
          {t('GANTT_CALENDAR_DELETE_CALENDAR')}
        </MenuItem>}
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  calendarPermisstions: state.gantt.calendarPermisstions
})

const mapDispatchToProps = {
  changeFlagFetchProjectSchedules,
  changeMainCalendar
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu)