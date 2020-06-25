import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { apiService } from 'constants/axiosInstance';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeFlagFetchProjectSchedules } from "../../../actions/gantt";


const ITEM_HEIGHT = 48;

function CustomMenu({ projectId, scheduleId, calendarPermisstions, changeFlagFetchProjectSchedules, isDefault }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key={1} onClick={handleClose}>
          Đặt làm lịch chính
        </MenuItem>
        <MenuItem key={2} onClick={() => {
          if (!calendarPermisstions.edit_schedule) return
          history.push(`/calendars/project/detail/${scheduleId}`)
        }}>
          Sửa
        </MenuItem>
        {!isDefault && <MenuItem key={3} onClick={() => {
          if (!calendarPermisstions.edit_schedule) return
          assignProjectSchedule(projectId, scheduleId)
        }}>
          Xóa
        </MenuItem>}
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  calendarPermisstions: state.gantt.calendarPermisstions
})

const mapDispatchToProps = {
  changeFlagFetchProjectSchedules
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu)