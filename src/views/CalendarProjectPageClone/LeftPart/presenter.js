import { ListItemText } from "@material-ui/core";
import { mdiCalendar, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { changeCalendarPermisstion, changeFlagFetchProjectSchedules, changeProjectSchedule } from 'actions/gantt';
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import { apiService } from "constants/axiosInstance";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UpdateProjectCalendar from "views/CalendarPage/views/Modals/UpdateProjectCalendar";
import { changeScheduleDetailGantt } from "../../../actions/gantt";
import CustomMenu from './CustomMenuCalendar';
import "./style.scss";

function CalendarProjectLeftPartPresenter({
  groupSchedules,
  handleOpenModal,
  fetchProjectSchedule,
  changeScheduleDetailGantt,
  changeProjectSchedule,
  handleUpdateGroupSchedule,
  scheduleDetailGantt,
  reducerProjectSchedules,
  changeFlagFetchProjectSchedules,
  handleSearchPattern,
  changeCalendarPermisstion,
  setopenModal,
  calendarPermisstions,
  searchPattern,
  handleDeleteGroup,
  havePermission,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const [menuAnchor, setMenuAnchor] = React.useState();
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [projectSchedules, setProjectSchedules] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [listSchedule, setListSchedule] = useState([]);

  function doOpenMenu(anchorEl) {
    setMenuAnchor(anchorEl);
  }
  const fetchProjectSchedules = async () => {
    try {
      const { projectId } = params
      const result = await apiService({
        url: `project/get-schedules?project_id=${projectId}`
      })
      changeProjectSchedule(result.data.schedules)
      changeFlagFetchProjectSchedules(false)
    } catch (e) {
      console.log(e)
    }
  }
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
  const fetchPermissionCalendar = async () => {
    try {
      const { projectId } = params
      const result = await apiService({
        url: `gantt/get-permissions?project_id=${projectId}`,
      })
      changeCalendarPermisstion(result.data.permissions)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchPermissionCalendar()
  }, [fetchProjectSchedule, params.projectId])
  useEffect(() => {
    if (fetchProjectSchedule)
      fetchProjectSchedules()
  }, [fetchProjectSchedule, params.projectId])
  return (
    <>
      <React.Fragment>
        <LeftSideContainer
          title={t("IDS_WP_PROJECT_CALENDAR")}
          rightAction={calendarPermisstions.assign_schedule &&
          {
            iconPath: mdiPlus,
            onClick: (evt) => { if (calendarPermisstions.assign_schedule) setopenModal(true) },
          }
          }
        >
          <StyledList className="gantt-left-menu-calendar__container">
            {reducerProjectSchedules.map(item => {
              return {
                ...item,
                id: item._id
              }
            }).map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledListItem
                    onClick={(e) => {
                      changeScheduleDetailGantt(item)
                    }}
                    className={`${
                      scheduleDetailGantt.id == get(item, "id", "")
                        ? "item-actived gantt-calendar__left-side"
                        : ""
                      }`}
                  >
                    <Icon
                      className="view_CaledarProjectPageLeftPart_List_iconLeft"
                      path={mdiCalendar}
                      size={1}
                      color={"#607D8B"}
                    />
                    <ListItemText
                      primary={
                        <Primary
                          className={`custom-title-setting-item ${
                            item.icon ? "" : "none-icon"
                            }`}
                        >
                          {get(item, "name", "")}
                        </Primary>
                      }

                      secondary={item.is_main ?
                        <div className="gantt--main-calendar__label">{t('GANTT_MAIN_CALENDAR_LABEL')}</div>
                        : null
                      }
                    />

                    {(calendarPermisstions.assign_schedule || calendarPermisstions.edit_schedule) && <CustomMenu canDelete={listSchedule.filter(schedule => schedule.id === item.id)[0] && listSchedule.filter(schedule => schedule.id === item.id)[0].can_delete} isMain={item.is_main} isDefault={item.is_default} scheduleId={get(item, "id", "")} projectId={params.projectId} />}
                  </StyledListItem>
                </React.Fragment>
              )
            })}
          </StyledList>
        </LeftSideContainer>
      </React.Fragment>
      <UpdateProjectCalendar
        open={false}
        setOpen={setOpenEditModal}
        schedule={groupSchedules.data.find(
          (item) => item.id === scheduleDetailGantt.id
        )}
        onConfirm={(name, descrtiption) =>
          handleUpdateGroupSchedule(scheduleDetailGantt.id, name, descrtiption)
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
  fetchProjectSchedule: state.gantt.fetchProjectSchedule,
  reducerProjectSchedules: state.gantt.projectSchedules,
  calendarPermisstions: state.gantt.calendarPermisstions
});

const mapDispatchToProps = {
  changeScheduleDetailGantt,
  changeProjectSchedule,
  changeFlagFetchProjectSchedules,
  changeCalendarPermisstion
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarProjectLeftPartPresenter);
