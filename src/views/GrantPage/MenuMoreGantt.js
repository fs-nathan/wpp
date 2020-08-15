import { Checkbox, FormControlLabel, MenuItem, MenuList, Paper } from "@material-ui/core";
import { changeFlagFetchProjectSchedules } from 'actions/gantt';
import 'antd/lib/menu/style/index.css';
import AssignCalendarModal from 'components/AssignCalendarModal';
import { default as React, useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CustomModal from "../../components/CustomModalGantt";
import { apiService } from "../../constants/axiosInstance";
import CalendarProjectPage from "../../views/CalendarProjectPageClone";
import "./calendarModal.css";

const MenuMoreGantt = ({
  changeVisibleExportPdfDrawer,
  scheduleDetailGantt,
  projectSchedules,
  changeVisibleMenu,
  changeFlagFetchProjectSchedules,
  calendarPermisstions
}) => {
  const [openConfigCalendar, setOpenConfigCalendar] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [listProjectSchedule, setListProjectSchedule] = useState([]);
  const { t } = useTranslation()
  const clickConfigCalendar = () => {
    setOpenConfigCalendar(true);
    changeVisibleMenu(false);
  };
  const params = useParams()
  useEffect(() => {
    fetchListSchedule();
    return () => null;
  }, []);

  const fetchListSchedule = async () => {
    try {
      const listSchedule = await apiService({
        url: "group-schedule/list-schedule",
      })
      setListSchedule(listSchedule.data.schedules);
    } catch (e) {
      console.log(e);
    }
  };
  const assignProjectSchedule = async (projectId, scheduleId, check) => {
    try {
      const url = check ? 'project/assign-schedules' : 'project/delete-schedules'
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
  useEffect(() => {
    setListProjectSchedule(projectSchedules.map(item => item._id))
  }, [projectSchedules])
  const renderListCalendarModal = useMemo(
    () =>
      listSchedule.map((item) => (
        <tr>
          <td>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked={listProjectSchedule.includes(item.id)}
                    disabled={!item.can_delete}
                  />
                }
                onClick={e => {
                  const { projectId } = params
                  assignProjectSchedule(projectId, item.id, e.target.checked)
                }}
                label={item.name}
              />
            </div>
          </td>
          <td>
            <div>{item.description}</div>
          </td>
        </tr>
      )),
    [listSchedule, listProjectSchedule]
  );
  return (
    <React.Fragment>
      <AssignCalendarModal setopenModal={setopenModal} openModal={openModal} />
      <CustomModal
        title={t('GANTT_CALENDAR_TITLE_MODAL')}
        className="gantt--calendar-modal__container"
        fullWidth={true}
        open={openConfigCalendar}
        setOpen={setOpenConfigCalendar}
        style={{}}
        height="tall"
        confirmRender={() => null}
        isScrollContainer={false}
      >
        <CalendarProjectPage
          setopenModal={setopenModal}
          scheduleDetailGantt={scheduleDetailGantt}
        />
      </CustomModal>
      <Paper>
        <MenuList open={true}>
          <MenuItem onClick={clickConfigCalendar}>{t('LABEL_GANTT_NAME_CALENDAR_MENU')}</MenuItem>
          <MenuItem
            onClick={() => {
              changeVisibleExportPdfDrawer(true);
              changeVisibleMenu(false);
            }}
          >
            {t('LABEL_GANTT_NAME_EXPORT_MENU')}
          </MenuItem>
        </MenuList>
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
  projectSchedules: state.gantt.projectSchedules,
  calendarPermisstions: state.gantt.calendarPermisstions
});
const mapDispatchToProps = {
  changeFlagFetchProjectSchedules
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMoreGantt);
