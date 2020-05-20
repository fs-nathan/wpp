import { getDataPinOnTaskChat, getEmotions, getGirdListTask, getListStickersRequest, openShareFileModal } from "actions/chat/chat";
import { detailStatus } from "actions/project/setting/detailStatus";
import { closeNoticeModal } from "actions/system/system";
import * as taskDetailAction from "actions/taskDetail/taskDetailActions";
import { JOIN_CHAT_EVENT, JOIN_PROJECT_EVENT } from "constants/actions/chat/chat";
import last from "lodash/last";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const projectId = useSelector(
    (state) => state.taskDetail.commonTaskDetail.activeProjectId
  );
  const userId = useSelector((state) => state.system.profile.id);
  const isOpenShareFileModal = useSelector(
    (state) => state.chat.isOpenShareFileModal
  );
  const item = useSelector((state) => state.chat.item);
  // console.log('JobDetailPage', taskId);

  useEffect(() => {
    dispatch(closeNoticeModal());
    dispatch(getListStickersRequest());
    dispatch(getEmotions());
    dispatch(getGirdListTask());
    dispatch(taskDetailAction.getRole());
    dispatch(taskDetailAction.getListOffer());
    dispatch(taskDetailAction.getPermission({ type: 4 }));
  }, [dispatch]);

  useEffect(() => {
    // console.log('url', url.pathname, 'projectId', projectId)
    const key = `${userId}:${lastJobSettingKey}`;
    const type_data = localStorage.getItem(key) || "include-room";
    // console.log(key, type_data, ' useEffect')
    const path = url.pathname;
    const id = last(path.split("/"));
    // console.log({ id, path });
    if (id.length > 0 && userId) {
      if (id !== projectId) {
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
      const customEvent = new CustomEvent(JOIN_CHAT_EVENT, { detail: taskId });
      requestAnimationFrame(() => {
        window.dispatchEvent(customEvent);
      });
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    const key = `${userId}:${lastJobSettingKey}`;
    const type_data = localStorage.getItem(key) || "include-room";
    // console.log(key, ' useEffect', type_data)
    // console.log('projectId', projectId)
    if (projectId !== "" && userId) {
      dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
      dispatch(taskDetailAction.getListTaskDetail(projectId, type_data));
      dispatch(taskDetailAction.getStaticTask(projectId));
      dispatch(taskDetailAction.getProjectListBasic(projectId));
      dispatch(detailStatus({ projectId }));
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
        <ShareDocumentModal onClose={onCloseShare} item={item} />
      )}
    </div>
  );
}

export default JobDetailPage;
