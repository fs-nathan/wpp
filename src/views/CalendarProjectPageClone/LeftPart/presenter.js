import { ListItemText } from "@material-ui/core";
import { mdiCalendar, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { changeFlagFetchProjectSchedules, changeProjectSchedule } from 'actions/gantt';
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import { apiService } from "constants/axiosInstance";
import { get } from "lodash";
import React, { useEffect } from "react";
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
  setopenModal,
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
    if (fetchProjectSchedule)
      fetchProjectSchedules()
  }, [fetchProjectSchedule])
  return (
    <>
      <React.Fragment>
        <LeftSideContainer
          title={t("IDS_WP_PROJECT_CALENDAR")}
          rightAction={
            {
              iconPath: mdiPlus,
              onClick: (evt) => setopenModal(true),
            }
          }
        >
          <StyledList className="gantt-left-menu-calendar__container">
            {reducerProjectSchedules.map(item => {
              console.log(item)
              return {
                ...item,
                id: item._id
              }
            }).map((item, index) => (
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
                  />
                  <CustomMenu isDefault={item.is_default} scheduleId={get(item, "id", "")} projectId={params.projectId} />
                </StyledListItem>
              </React.Fragment>
            ))}
          </StyledList>
        </LeftSideContainer>
      </React.Fragment>
      <UpdateProjectCalendar
        open={openEditModal}
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
});

const mapDispatchToProps = {
  changeScheduleDetailGantt,
  changeProjectSchedule,
  changeFlagFetchProjectSchedules
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarProjectLeftPartPresenter);
