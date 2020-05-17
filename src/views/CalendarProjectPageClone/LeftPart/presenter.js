import { ListItemText, Menu, MenuItem } from "@material-ui/core";
import { mdiCalendar, mdiDotsVertical, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UpdateProjectCalendar from "views/CalendarPage/views/Modals/UpdateProjectCalendar";
import { changeScheduleDetailGantt } from "../../../actions/gantt";
import "./style.scss";

const Banner = ({ className = "", ...props }) => (
  <div
    className={`view_CaledarProjectPageLeftPart_List___banner ${className}`}
    {...props}
  />
);

function CalendarProjectLeftPartPresenter({
  groupSchedules,
  handleOpenModal,
  changeScheduleDetailGantt,
  handleUpdateGroupSchedule,
  scheduleDetailGantt,
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

  function doOpenMenu(anchorEl) {
    setMenuAnchor(anchorEl);
  }

  return (
    <>
      <React.Fragment>
        <LeftSideContainer
          title={t("IDS_WP_PROJECT_CALENDAR")}
          rightAction={
            havePermission
              ? {
                  iconPath: mdiPlus,
                  onClick: (evt) => setopenModal(true),
                }
              : null
          }
        >
          <StyledList>
            {groupSchedules.data.map((item, index) => (
              <React.Fragment key={index}>
                <StyledListItem
                  onClick={() => changeScheduleDetailGantt(item)}
                  className={`${
                    scheduleDetailGantt.id == get(item, "id", "")
                      ? "item-actived"
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
                </StyledListItem>
              </React.Fragment>
            ))}
          </StyledList>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={(evt) => setMenuAnchor(null)}
            transformOrigin={{
              vertical: -30,
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={(evt) => {
                setOpenEditModal(true);
                setMenuAnchor(null);
              }}
            >
              {t("views.calendar_page.right_part.edit")}
            </MenuItem>
            <MenuItem
              onClick={(evt) => {
                setMenuAnchor(null);
                handleDeleteGroup(scheduleDetailGantt.id);
              }}
            >
              {t("views.calendar_page.right_part.delete")}
            </MenuItem>
          </Menu>
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
});

const mapDispatchToProps = {
  changeScheduleDetailGantt,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarProjectLeftPartPresenter);
