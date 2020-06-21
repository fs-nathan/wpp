import { IconButton, ListItemText, MenuItem, MenuList, Paper } from "@material-ui/core";
import { mdiCalendar, mdiDotsVertical, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { changeFlagFetchProjectSchedules, changeProjectSchedule } from 'actions/gantt';
import { Dropdown } from "antd";
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import { apiService } from "constants/axiosInstance";
import { get } from "lodash";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UpdateProjectCalendar from "views/CalendarPage/views/Modals/UpdateProjectCalendar";
import MoreMenuGantt from 'views/GrantPage/MenuMoreGantt';
import { changeScheduleDetailGantt } from "../../../actions/gantt";
import "./style.scss";


const Menueee = (<Paper className="dsfsd">
  <MenuList>
    <MenuItem >Lịch dự án</MenuItem>
    <MenuItem

    >
      Xuất file PDF
</MenuItem>
  </MenuList>
</Paper>)
const Banner = ({ className = "", ...props }) => (
  <div
    className={`view_CaledarProjectPageLeftPart_List___banner ${className}`}
    {...props}
  />
);

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
          <StyledList>
            {reducerProjectSchedules.map(item => ({
              ...item,
              id: item._id
            })).map((item, index) => (
              <React.Fragment key={index}>
                <StyledListItem
                  onClick={() => changeScheduleDetailGantt(item)}
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
                  {item.can_modify && (
                    <abbr title={t("IDS_WP_MORE")}>
                      <Icon
                        path={mdiDotsVertical}
                        size={1.4}
                        color={item.color || "rgba(0, 0, 0, 0.54)"}
                        onClick={(evt) => doOpenMenu(evt.currentTarget)}
                      />
                    </abbr>
                  )}
                  <Dropdown
                    overlay={() =>
                      <MoreMenuGantt />
                    }
                    onVisibleChange={(flag) => setVisible(flag)}
                    visible={visible}
                    placement="bottomRight"
                    trigger={["click", 'hover']}
                  >
                    <div>
                      <IconButton
                        className="MuiButtonBase-root MuiButton-root MuiButton-text comp_CustomTable_HeaderButtonGroup___button MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedText MuiButtonGroup-groupedTextHorizontal MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        size="small"
                      >
                        <div>
                          <Icon
                            style={{ fill: "rgba(0, 0, 0, 0.54)" }}
                            path={mdiPlus}
                            size={1}
                          />
                        </div>

                      </IconButton>
                    </div>
                  </Dropdown>
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
