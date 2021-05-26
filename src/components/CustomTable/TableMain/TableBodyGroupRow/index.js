import {
  Button,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { mdiMenuDown, mdiMenuUp, mdiPlus, mdiDotsVertical, mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { get, isNil , includes} from "lodash";
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
import { IndeterminateCheckBoxSharp } from "@material-ui/icons";
import { isSortGroupTask } from "actions/groupTask/sortGroupTask";

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
const DragBox = ({ className = '', ...props }) =>
  <div 
    className={`comp_CustomTable_TableBodyRow___drag-box-group ${className}`}
    {...props}
  />
 
function TableBodyGroupRow({ group, index }) {
  const { options, columns } = React.useContext(CustomTableContext);
  const [open, setOpen] = React.useState(
    group[get(options, "grouped.item")].length > 0 ? true : false
  );
  const [mouse,setMouse] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
  const { t } = useTranslation();
  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);
  const [openGroupTask, setOpenGroupTask] = React.useState(false);
  const dispatch = useDispatch();
  let inSearch = false;
  React.useEffect(() => {
    setOpen(group[get(options, "grouped.item")].length > 0 ? true : false);
  }, [get(options, "grouped.item"), group[get(options, "grouped.item")]]);
  const handleDeleteGroup = () => {
    dispatch(deleteGroupTask({ groupTaskId: group.id }));
  };
  if (get(options, 'search'))
    for (const key in group) {
      if (
        group.hasOwnProperty(key) &&
        get(group, key, '') &&
        includes(get(group, key, '').toString().toLowerCase(), get(options, 'search.patern', '').toLowerCase())
      ) inSearch = true;
    }
React.useEffect(()=>{
 dispatch(isSortGroupTask(mouse))
},[mouse])
  return (
    <Droppable
      droppableId={group[get(options, "grouped.id")]}
      direction="vertical"
    >
      {(provided, snapshot) => (
        <TableBody ref={provided.innerRef} {...provided.droppableProps}>
          {!inSearch || group?.task?.length < 1 ? null :
          // <Draggable  draggableId={group[get(options, "grouped.id")]} index={index} >
          //   {(provideds,snapshots) => (
          <StyledTableBodyRowGroup
          // innerRef={provideds.innerRef}
          //   {...provideds.draggableProps} 
          //   onMouseDown={()=> setMouse(true)}
          //   onMouseUp={()=> setMouse(false)}

            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {setAnchorEl(null);setHover(false)}}
          >
            {/* {get(options, 'grouped.draggable', false) &&  get(options, 'draggable.bool', false)&&
            <StyledTableBodyCell
              align={'center'}
              onMouseEnter={()=>setHover(true)}
              draggable={true}
              className={get(options, 'grouped.draggable', false)&& get(options, 'draggable.bool', false) && 'group-icon-drag'}
            >
              <div {...provideds.dragHandleProps} className={hover ? 'icon-drag-hover': 'icon-drag-hide'}>
                <Icon path={mdiDragVertical} size={1} color='#8d8d8d'/>
              </div>
            </StyledTableBodyCell>
            } */}
            {/* draggable={true} className={get(options, 'grouped.draggable', false)&& get(options, 'draggable.bool', false) && 'group-task-name'} */}
            <StyledTableBodyCell   colSpan={get(columns, "length", 0) + 1}>
              <CustomButton
                fullWidth
                size="small"
                onClick={() => setOpen((open) => !open)}
                style={{ width: "calc(100% - 60px)" }}
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
                // draggable={true}
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
              {Boolean(anchorEl) &&
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
             }
             {openAlertDelete &&
              <AlertModal
                setOpen={setOpenAlertDelete}
                onConfirm={() => handleDeleteGroup()}
                open={openAlertDelete}
                content={t("DMH.VIEW.PP.MODAL.CUGT.ALERT")}
              />
             }
             {projectId && openGroupTask && 
              <EditGroupTask
                project_id={projectId}
                open={openGroupTask}
                setOpen={setOpenGroupTask}
                curGroupTask={group}
              />
             }
            </StyledTableBodyCell>
          </StyledTableBodyRowGroup>
          // )}
          // </Draggable>
          }
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
