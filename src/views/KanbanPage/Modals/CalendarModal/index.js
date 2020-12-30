import 'antd/lib/menu/style/index.css';
import React from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import CustomModal from "components/CustomModalGantt";
import CalendarProjectPage from "views/CalendarProjectPageClone";
import { changeCalendarPermisstion, changeScheduleDetailGantt } from "actions/gantt";
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { apiService } from "constants/axiosInstance";
import { get } from 'lodash';
import "views/GrantPage/calendarModal.css";
import "views/GrantPage/table.css";

const CalendarModal = ({
  scheduleDetailGantt,
  open, setOpen,
  projectId,
  doChangeScheduleDetailGantt,
  doChangeCalendarPermisstion,
}) => {

  const { t } = useTranslation();

  const fetchListSchedule = async () => {
    try {
      const [result, permisstion] = await Promise.all([apiService({
        url: "group-schedule/list-schedule",
      }), apiService({
        url: `gantt/get-permissions?project_id=${projectId}`,
      })]);
      const { permissions } = permisstion.data
      const { schedules } = result.data;
      doChangeScheduleDetailGantt(schedules[0]);
      doChangeCalendarPermisstion(permissions);
    } catch (e) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(e, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
    }
  };

  React.useEffect(() => {
    fetchListSchedule();
  }, [projectId]);

  return (
    <CustomModal
      title={t('GANTT_CALENDAR_TITLE_MODAL')}
      className="gantt--calendar-modal__container"
      fullWidth={true}
      open={open}
      setOpen={setOpen}
      style={{}}
      height="tall"
      confirmRender={() => null}
      isScrollContainer={false}
    >
      <CalendarProjectPage
        setopenModal={setOpen}
        scheduleDetailGantt={scheduleDetailGantt}
      />
    </CustomModal>
  );
};

const mapStateToProps = (state) => ({
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
});

const mapDispatchToProps = dispatch => ({
  doChangeScheduleDetailGantt: (detail) => dispatch(changeScheduleDetailGantt(detail)),
  doChangeCalendarPermisstion: (permissions) => dispatch(changeCalendarPermisstion(permissions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
