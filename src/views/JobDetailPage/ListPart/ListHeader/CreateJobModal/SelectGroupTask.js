import SearchIcon from "@material-ui/icons/Search";
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchInput from "components/SearchInput";
import React, { useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "components/CustomModal";
import styled from "styled-components";
import { currentColorSelector } from "views/Chat/selectors";
import { fetchListTaskGroup } from "actions/taskDetail/taskDetailActions";
import { actionSortGroupTask } from "actions/groupTask/sortGroupTask";
import { useHistory } from "react-router-dom";
import {
  CREATE_GROUP_TASK,
  COPY_GROUP_TASK,
  UPDATE_GROUP_TASK,
  DELETE_GROUP_TASK,
  CustomEventDispose,
  CustomEventListener,
  CustomEventEmitter,
  SORT_GROUP_TASK
} from "constants/events";
import AlertModal from "components/AlertModal";
import nodata from "assets/ic_no_data_2021.png";
import { deleteGroupTask } from "actions/groupTask/deleteGroupTask";
import CreateGroupTask from "views/ProjectPage/Modals/CreateGroupTask";
import EditGroupTask from "views/ProjectPage/Modals/CreateNewGroupTask";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import { useDrag, useDrop } from 'react-dnd';

export const StyledDiv = styled.div`
  .line-option-selected {
    background: ${(props) => props.selectedColor}!important;
    color: #fff !important;
  }
  .per-line-modal {
    border-bottom: 2px solid #fff;
    border-top: 2px solid #fff
  }
  .line-drag-drop-down {
    border-bottom: 2px solid ${(props) => props.selectedColor};
  }
  .line-drag-drop-up {
    border-top: 2px solid ${(props) => props.selectedColor};
  }
`;

const Row = (props) => {
  const classRow = props.isSelected ? "line-option-selected" : "";
  const ref = React.useRef(null);

  const handleSelect = () => {
    props.onSelect(props.group);
  };

  const editOfferGroup = (evt) => {
    evt.stopPropagation();
    props.handleOpenEditGroup(props.group);
  };
  const deleteOfferGroup = (evt) => {
    evt.stopPropagation();
    props.confimDeleteGroup(props.group);
  };

  const [{ isOver, handlerId, dropClassName }, drop] = useDrop({
    accept: "GroupTask",
    collect(monitor) {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === props.index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        handlerId: monitor.getHandlerId(),
        dropClassName:
          dragIndex < props.index ? 'line-drag-drop-down' : 'line-drag-drop-up',
      };
    },
    drop: (item, monitor) => {
      props.moveGroupTask(item.index, props.index);
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: {type: "GroupTask", index: props.index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  const classHoverDraging = isOver ? dropClassName : "";

  return (
    <StyledDiv selectedColor={props.appColor} onClick={handleSelect} ref={ref} data-handler-id={handlerId}>
      <div className={`line-option per-line-modal ${classRow} ${classHoverDraging}`}>
        <div className="icon-option">
          <Icon path={mdiDragVertical} size={1}/>
        </div>
        <div className="name-option">{props.group.name}</div>
        {props.group.can_modify && (
          <div className="control-option">
            <CreateIcon onClick={editOfferGroup} />
            <DeleteOutlineIcon onClick={deleteOfferGroup} />
          </div>
        )}
      </div>
    </StyledDiv>
  );
};

function SelectGroupTask({
  isOpen,
  setOpen,
  onSubmit = () => {},
  selectedOption = () => {},
  groupSelected,
  projectId,
  skipSelect = false
}) {
  const timeoutRef = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [groupOriginal, setGroupOriginal] = useState([]);
  const [groupTask, setGroupTask] = useState(groupOriginal);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [groupDelete, setGroupDelete] = useState(null);

  const appColor = useSelector(currentColorSelector);

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value);
    const value = evt.target.value;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      let groupTemp = [];
      groupOriginal.map((e) => {
        if (
          String(e.name).toLowerCase().indexOf(String(value).toLowerCase()) >= 0
        ) {
          groupTemp.push(e);
        }
      });
      setGroupTask(groupTemp);
    }, 300);
  }

  async function fetchListGroup() {
    try {
      if (isOpen) {
        const groupData = await fetchListTaskGroup({ project_id: projectId });
        setGroupOriginal(groupData.data.group_tasks);
        setGroupTask(groupData.data.group_tasks);
      }
    } catch (e) {}
  }

  React.useEffect(() => {
    fetchListGroup();
  }, [isOpen]);

  React.useEffect(() => {
    CustomEventListener(CREATE_GROUP_TASK.SUCCESS, fetchListGroup);
    CustomEventListener(COPY_GROUP_TASK.SUCCESS, fetchListGroup);
    CustomEventListener(UPDATE_GROUP_TASK.SUCCESS, () => {
      setGroupUpdate(null);
      fetchListGroup();
    });
    CustomEventListener(DELETE_GROUP_TASK.SUCCESS, () => {
      fetchListGroup();
      if (groupDelete && groupSelected === groupDelete.id) {
        selectedOption(null);
      }
      setGroupDelete(null);
    });
    return () => {
      CustomEventDispose(CREATE_GROUP_TASK.SUCCESS, fetchListGroup);
      CustomEventDispose(COPY_GROUP_TASK.SUCCESS, fetchListGroup);
      CustomEventListener(UPDATE_GROUP_TASK.SUCCESS, () => {
        setGroupUpdate(null);
        fetchListGroup();
      });
      CustomEventListener(DELETE_GROUP_TASK.SUCCESS, fetchListGroup);
    };
  }, []);

  function handleOpenCreateGroup() {
    setOpenModal(true);
    setGroupUpdate(null);
  }

  function handleOpenEditGroup(group) {
    setGroupUpdate(group);
  }

  function confimDeleteGroup(group) {
    setOpenAlertDelete(true);
    setGroupDelete(group);
  }
  const handleDeleteGroup = () => {
    dispatch(deleteGroupTask({ groupTaskId: groupDelete.id }));
  };
  function handleSelect(group) {
    selectedOption(group);
    if (!skipSelect) setOpen(false);
  }

  async function sortGroupTask(dropIndex, itemId) {
    try {
      if (isOpen) {
        await actionSortGroupTask({
          sort_index: dropIndex,
          group_task_id: itemId
        })
        CustomEventEmitter(SORT_GROUP_TASK);
      }
    } catch (e) {}
  }

  const moveGroupTask = React.useCallback(
    (oldIndex, dropIndex) => {
      if (searchValue !== "" || oldIndex === dropIndex) {
        return false;
      }
      const dragCard = groupOriginal[oldIndex];
      sortGroupTask(dropIndex, groupOriginal[oldIndex].id)
      let newGroupTask = update(groupOriginal, {
        $splice: [
          [oldIndex, 1],
          [dropIndex, 0, dragCard],
        ],
      })
      setGroupOriginal(newGroupTask);
      setGroupTask(newGroupTask);
    },
    [groupOriginal]
  );

  return (
    <>
      <CustomModal
        title={t("LABEL_CHAT_TASK_CHON_NHOM_CONG_VIEC")}
        open={isOpen}
        setOpen={setOpen}
        onCancle={() => {
          setOpen(false);
        }}
        height="tall"
        maxWidth="sm"
        actionLoading={loading}
        manualClose={true}
        canConfirm={true}
        className="custom-select-modal"
        confirmRender={null}
        cancleRender={() => t("IDS_WP_EXIT")}
      >
        <div className="body-head">
          <div className="per-line-modal">
            <SearchInput
              className={"custom-search"}
              placeholder={t("LABEL_SEARCH_TASK_GROUP")}
              value={searchValue}
              onChange={handleChangeSearch}
            />
          </div>
          <div className="per-line-modal tip-line">
            <b>{t("LABEL_TIP_IN_OFFER")}</b>
            <span>{t("LABEL_DESCRIPTION_TIP_IN_TASK_GROUP")}</span>
          </div>
          <div className="per-line-modal create-line">
            <span onClick={handleOpenCreateGroup} style={{ color: appColor }}>
              &#43; {t("CREATE_NEW_TASK_GROUP")}
            </span>
          </div>
        </div>
        <div className="body-main">
          <DndProvider backend={HTML5Backend}>
            {groupTask.length ? (
              groupTask.map((e, index) => (
                <Row
                  appColor={appColor}
                  key={e.id}
                  group={e}
                  onSelect={handleSelect}
                  isSelected={groupSelected === e.id ? true : false}
                  handleOpenEditGroup={handleOpenEditGroup}
                  confimDeleteGroup={confimDeleteGroup}
                  moveGroupTask={moveGroupTask}
                  index={index}
                />
              ))
            ) : (
              <div className="no-data-parent">
                <div className="no-data-selection">
                  <img className="MuiAvatar-img" src={nodata} />
                  <p>{t("LABEL_NO_DATA_SELECT_MODAL_TASK_GROUP")}</p>
                  <p>{t("DESCRIPTION_NO_DATA_SELECT_MODAL_TASK_GROUP")}</p>
                </div>
              </div>
            )}
          </DndProvider>
        </div>
      </CustomModal>
      {!groupUpdate ? (
        <CreateGroupTask
          open={openModal}
          setOpen={(value) => setOpenModal(value)}
          project_id={projectId}
        />
      ) : (
        <EditGroupTask
          open={true}
          setOpen={(value) => {
            if (!value) {
              setGroupUpdate(null);
            }
          }}
          project_id={projectId}
          curGroupTask={groupUpdate}
        />
      )}

      {openAlertDelete && (
        <AlertModal
          setOpen={(value) => setOpenAlertDelete(value)}
          onConfirm={() => handleDeleteGroup()}
          open={true}
          content={t("DMH.VIEW.PP.MODAL.CUGT.ALERT")}
        />
      )}
    </>
  );
}

export default SelectGroupTask;
