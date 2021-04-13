import { getDataPinOnTaskChat, getEmotions, getGirdListTask, getListStickersRequest, getViewedChat, loadChat, openDetailMember, openShareFileModal } from "actions/chat/chat";
import { detailStatus } from "actions/project/setting/detailStatus";
import { closeNoticeModal } from "actions/system/system";
import * as taskDetailAction from "actions/taskDetail/taskDetailActions";
import { getPermissionViewDetailProject } from "actions/viewPermissions";
import { JOIN_CHAT_EVENT, JOIN_PROJECT_EVENT } from "constants/actions/chat/chat";
import last from "lodash/last";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ShareDocumentModal from "views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal";
import "../JobDetailPage/index.scss";
import ForwardMessageDialog from './ChatComponent/ForwardMessageDialog';
import ChatPart from "./ChatPart";
import Intro from "./introduce";
import ListPart from "./ListPart";
import { lastJobSettingKey } from "./ListPart/ListHeader/CreateJobSetting";
import ModalImage from "./ModalImage";
import TabPart from "./TabPart";

function JobDetailPage(props) {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const taskId = url.searchParams.get("task_id");
  const history = useHistory();
  const projectId = useSelector(
    (state) => state.taskDetail.commonTaskDetail.activeProjectId
  );
  const userId = useSelector((state) => state.system.profile.id);
  const isOpenShareFileModal = useSelector(
    (state) => state.chat.isOpenShareFileModal
  );
  const item = useSelector((state) => state.chat.item);
  const errorMessage = useSelector((state) => state.taskDetail.detailTask.errorMessage);
  const users_shared = item ? item.users_shared || [] : [];
  const shareItem = { ...item, users_shared }
  // console.log('JobDetailPage', taskId);

  useEffect(() => {
    dispatch(closeNoticeModal());
    dispatch(getListStickersRequest());
    dispatch(getEmotions());
    dispatch(getGirdListTask());
    dispatch(taskDetailAction.detailGroupPermissionDefault())
    dispatch(taskDetailAction.getRole());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage === 'This task does not exist') {
      history.push('/projects/task-chat/' + projectId)
    }
  }, [errorMessage, history, projectId]);

  useEffect(() => {
    // console.log('url', url.pathname, 'projectId', projectId)
    
    // console.log(key, type_data, ' useEffect')
    const path = url.pathname;
    const id = last(path.split("/"));
    // console.log({ id, path });
    if (id.length > 0 && userId) {
      if (id !== projectId) {
        const key = `TASK_GIRD:${userId}:${id}`;
        const type_data = localStorage.getItem(key) || "include-room";
        dispatch(taskDetailAction.getProjectListBasic(id));
        // dispatch(taskDetailAction.chooseProject({ id }))
        dispatch(taskDetailAction.getListTaskDetail(id, type_data));
        dispatch(taskDetailAction.getProjectDetail(id));
      }
    }
  }, [dispatch, projectId, url, userId]);

  useEffect(() => {
    // console.log('taskId', taskId)
    if (taskId) {
      dispatch(taskDetailAction.getMemberNotAssigned({ task_id: taskId }));
      dispatch(taskDetailAction.getMember({ task_id: taskId }));
      dispatch(taskDetailAction.chooseTask(taskId));
      dispatch(taskDetailAction.getTaskDetailTabPart({ taskId }));
      dispatch(getDataPinOnTaskChat(taskId));
      dispatch(loadChat(taskId));
      dispatch(getViewedChat(taskId));
      dispatch(openDetailMember(false))

      const customEvent = new CustomEvent(JOIN_CHAT_EVENT, { detail: taskId });
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.dispatchEvent(customEvent);
        }, 0);
      });
    } else {
      dispatch(taskDetailAction.chooseTask(taskId));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (projectId !== "" && userId) {
      const key = `TASK_GIRD:${userId}:${projectId}`;
      const type_data = localStorage.getItem(key) || "include-room";
      dispatch(taskDetailAction.getListTaskDetail(projectId, type_data));
      dispatch(taskDetailAction.getStaticTask(projectId));
      dispatch(taskDetailAction.getProjectListBasic(projectId));
      // dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
      dispatch(detailStatus({ projectId }));
      dispatch(getPermissionViewDetailProject({ projectId }));
      const customEvent = new CustomEvent(JOIN_PROJECT_EVENT, {
        detail: projectId,
      });
      requestAnimationFrame(() => {
        window.dispatchEvent(customEvent);
      });
    }
  }, [dispatch, projectId, userId]);

  function onCloseShare() {
    dispatch(openShareFileModal(false));
  }

  return (
    <div className={taskId ? "container" : "container-job-introduce"}>
      <ListPart />
      {taskId ? (
        <>
          <ChatPart />
          <TabPart />
        </>
      ) : (
          <Intro />
        )}
      <ModalImage />
      <ForwardMessageDialog />
      {isOpenShareFileModal && (
        <ShareDocumentModal onClose={onCloseShare} item={shareItem} />
      )}
    </div>
  );
}

export default JobDetailPage;
