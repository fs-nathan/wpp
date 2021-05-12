import {
  Button,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { mdiMenuDown, mdiMenuUp, mdiPlus, mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { get, isNil } from "lodash";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CustomTableContext } from "../../index";
import "./style.scss";
import TableBodyRow from "./TableBodyRow";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
// import CreateNewOrUpdateGroupTask from 'views/ProjectPage/Modals/CreateNewGroupTask/presenters';
import { useParams } from "react-router";
import EditGroupTask from "views/ProjectPage/Modals/CreateNewGroupTask";
import AlertModal from "components/AlertModal";
import { useDispatch } from "react-redux";
import { deleteGroupTask } from "actions/groupTask/deleteGroupTask";

const StyledTableBodyRowGroup = ({ className = "", ...rest }) => (
  <TableRow
    className={`comp_CustomTable_TableBodyGroup___row ${className}`}
    {...rest}
  />
);
const StyledTableBodyCell = ({ className = "", ...rest }) => (
  <TableCell className={`${className}`} {...rest} />
);
const CustomButton = ({ className = "", ...rest }) => (
  <Button
    className={`comp_CustomTable_TableBodyGroup___button ${className}`}
    {...rest}
  />
);

function TableBodyGroupRow({ group, index }) {
  const { options, columns } = React.useContext(CustomTableContext);
  const [open, setOpen] = React.useState(
    group[get(options, "grouped.item")].length > 0 ? true : false
  );
  const [hover, setHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
  const { t } = useTranslation();
  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);
  const [openGroupTask, setOpenGroupTask] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setOpen(group[get(options, "grouped.item")].length > 0 ? true : false);
  }, [get(options, "grouped.item"), group[get(options, "grouped.item")]]);
  const handleDeleteGroup = () => {
    dispatch(deleteGroupTask({ groupTaskId: group.id }));
  };
  return (
    <Droppable
      droppableId={group[get(options, "grouped.id")]}
      direction="vertical"
    >
      {(provided, snapshot) => (
        <TableBody ref={provided.innerRef} {...provided.droppableProps}>
          <StyledTableBodyRowGroup
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {setAnchorEl(null);setHover(false)}}
          >
            <StyledTableBodyCell colSpan={get(columns, "length", 0) + 1}>
              <CustomButton
                fullWidth
                size="small"
                onClick={() => setOpen((open) => !open)}
                style={{ width: "98%" }}
              >
                {typeof get(options, "grouped.label") === "function"
                  ? options.grouped.label(group)
                  : group[get(options, "grouped.label")]}
                {open || snapshot.isDraggingOver ? (
                  <Icon path={mdiMenuDown} size={1} color="#44485e" />
                ) : (
                  <Icon path={mdiMenuUp} size={1} color="#44485e" />
                )}
              </CustomButton>
              <div
                onMouseEnter={() => setHover(true)}
                className={`action_group ${hover && "action_group_hover"}`}
              >
                {typeof get(options, "grouped.action") === "function" &&
                  
                  get(options, "grouped.canCreateTask") && (
                    <IconButton
                      size="small"
                      onClick={() => options.grouped.action(group)}
                    >
                      <Icon
                        path={mdiPlus}
                        size={1}
                        color="rgba(66, 63, 63, 0.54)"
                      />
                    </IconButton>
                  )
                  
                  
                  }
                {typeof get(options, "grouped.action") === "function" &&
                   get(group, "can_modify", true) && (
                    <IconButton
                      aria-describedby="menuMoreAction"
                      aria-haspopup="true"
                      size="small"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <Icon
                        path={mdiDotsVertical}
                        size={1}
                        color="rgba(66, 63, 63, 0.54)"
                      />
                    </IconButton>
                  )
                }
              </div>
              <Menu
                id="menuMoreAction"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              
              >
                <MenuItem onClick={() => setOpenGroupTask(true)}>
                  {t("views.calendar_page.right_part.edit")}
                </MenuItem>
                <MenuItem onClick={() => setOpenAlertDelete(true)}>
                  {t("views.calendar_page.right_part.delete")}
                </MenuItem>
              </Menu>
              <AlertModal
                setOpen={setOpenAlertDelete}
                onConfirm={() => handleDeleteGroup()}
                open={openAlertDelete}
                content={t("DMH.VIEW.PP.MODAL.CUGT.ALERT")}
              />
              <EditGroupTask
                project_id={projectId}
                open={openGroupTask}
                setOpen={setOpenGroupTask}
                curGroupTask={group}
              />
            </StyledTableBodyCell>
          </StyledTableBodyRowGroup>
          {(open || snapshot.isDraggingOver) &&
            group[get(options, "grouped.item")].map((row, index) => (
              <TableBodyRow key={index} index={index} row={row} group={group} />
            ))}
          {provided.placeholder}
        </TableBody>
      )}
    </Droppable>
  );
}

export default TableBodyGroupRow;
