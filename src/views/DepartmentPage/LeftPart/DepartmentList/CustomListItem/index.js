import {
  ListItemSecondaryAction,
  ListItemText,
  Popover,
} from "@material-ui/core";
import { mdiDotsVertical, mdiDragVertical, mdiMore } from "@mdi/js";
import Icon from "@mdi/react";
import { get } from "lodash";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomAvatar from "../../../../../components/CustomAvatar";
import {
  Primary,
  Secondary,
  StyledListItem,
} from "../../../../../components/CustomList";
import CreateAndUpdateDepartmentModal from "../../../Modals/CreateAndUpdateDepartment";
import DeleteDepartmentModal from "../../../Modals/DeleteDepartment";
import "./style.scss";
function CustomListItem({ room, index, handleLink, canDrag }) {
  const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const [
    openCreateAndUpdateDepartmentModal,
    setOpenCreateAndUpdateDepartmentModal,
  ] = React.useState(false);

  const { t } = useTranslation();
  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  console.log(room);
  const id = open ? "simple-popover" : undefined;
  if (canDrag)
    return (
      <Draggable draggableId={get(room, "id")} index={index}>
        {(provided) => (
          <StyledListItem
            component={Link}
            to={"#"}
            onClick={(evt) => handleLink(get(room, "id"))}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <CustomAvatar
              style={{ height: 32, width: 32, marginRight: "10px" }}
              src={room.icon}
              alt="avatar"
            />
            <ListItemText
              primary={<Primary>{get(room, "name", "")}</Primary>}
              secondary={
                <Secondary>
                  {t("DMH.VIEW.DP.LEFT.LIST.NUM_MEM", {
                    members: get(room, "number_member", 0),
                  })}
                </Secondary>
              }
            />
            <ListItemSecondaryAction>
              <div
                onMouseEnter={() => setIsHover(true)}
                className="list-action"
                style={{ display: "flex" }}
              >
                <div
                  aria-describedby="simple"
                  aria-haspopup="true"
                  onClick={openMenu}
                  style={{ cursor: "pointer" }}
                >
                  <Icon
                    path={mdiDotsVertical}
                    size={1}
                    color={
                      !isHover ? "rgba(0,0,0,0)" : "rgba(119, 111, 111, 1)"
                    }
                  />
                </div>
                <Popover
                  id="simple"
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {get(room, 'can_delete', false) &&
                  <div onClick={() => setOpenAlertModal(true)}>
                  {t("views.calendar_page.right_part.delete")}
                  </div>
                 }
                  <div
                    onClick={() => setOpenCreateAndUpdateDepartmentModal(true)}
                  >
                    {t("views.calendar_page.right_part.edit")}
                  </div>
                </Popover>

                <DeleteDepartmentModal
                  open={openAlertModal}
                  setOpen={setOpenAlertModal}
                  selectedRoom={room}
                />
                <CreateAndUpdateDepartmentModal
                  open={openCreateAndUpdateDepartmentModal}
                  setOpen={setOpenCreateAndUpdateDepartmentModal}
                  updateDepartment={room}
                />
                <div {...provided.dragHandleProps}>
                  <Icon
                    path={mdiDragVertical}
                    size={1}
                    color={
                      !isHover ? "rgba(0,0,0,0)" : "rgba(119, 111, 111, 1)"
                    }
                  />
                </div>
              </div>
            </ListItemSecondaryAction>
          </StyledListItem>
        )}
      </Draggable>
    );
  else
    return (
      <StyledListItem
        component={Link}
        to={"#"}
        onClick={(evt) => handleLink(get(room, "id"))}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <CustomAvatar
          style={{ height: 50, width: 50 }}
          src={room.icon}
          alt="avatar"
        />
        <ListItemText
          primary={<Primary>{get(room, "name", "")}</Primary>}
          secondary={
            <Secondary>
              {t("DMH.VIEW.DP.LEFT.LIST.NUM_MEM", {
                members: get(room, "number_member", 0),
              })}
            </Secondary>
          }
        />
      </StyledListItem>
    );
}
export default CustomListItem;
