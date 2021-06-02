import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { forwardChat, forwardMessage, loadListTask } from 'actions/chat/chat';
import clsx from 'clsx';
import DialogWrap from 'components/DialogWrap';
import SearchInput from 'components/SearchInput';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectBody from 'views/JobDetailPage/ListPart/ListProject/ListProjectBody';
import './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ForwardMessageDialogWork from './work';
import ForwardMessageDialogMessage from './message';

function ForwardMessageDialog({ }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const listTasks = useSelector(state => state.chat.listTasks);
  const isOpenForward = useSelector(state => state.chat.isOpenForward);
  const isLoading = useSelector(state => state.chat.isLoadingForward);
  const contentForward = useSelector(state => state.chat.contentForward);
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [sending, setSending] = useState({});

  const [modalForwardToWork, setOpenModalForwardToWork] = useState(false);
  const [modalForwardToMessage, setOpenModalForwardToMessage] = useState(false);

  let data = [];
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }

  if (searchKey) {
    data = data.filter(group => {
      return group.name.indexOf(searchKey) !== -1
        || group.projects.some(project => project.name.indexOf(searchKey) !== -1)
    });
  }

  const handleClose = () => {
    dispatch(forwardMessage(false));
  };

  function onClickProject(project) {
    return () => {
      setSelectedProject(project)
      dispatch(loadListTask(project.id))
    }
  }

  function onClickSend(task) {
    return () => {
      if (isLoading) return;
      setSending(task)
      dispatch(forwardChat(
        taskId,
        contentForward.id,
        task
      ))
    }
  }

  function onChangeKey(evt) {
    setSearchKey(evt.target.value)
  }

  function handleChangeStateModalForwardToWork(status) {
    setOpenModalForwardToWork(status)
  }

  function handleChangeStateModalForwardToMessage(status) {
    setOpenModalForwardToMessage(status)
  }

  return (
    <>
      <DialogWrap
        title={t('LABEL_CHAT_TASK_FORWARD')}
        isOpen={isOpenForward}
        handleClickClose={handleClose}
        successLabel={t('LABEL_CHAT_TASK_THOAT')}
        onClickSuccess={handleClose}
        maxWidth="sm"
        isOneButton
        className="ForwardMessageDialogMain forward-message-modal"
        scroll="body"
      // isLoading={isLoading}
      >
        <div className="ForwardMessageDialogMain--content" >
          <div className="step-title">{t('LABEL_CHAT_TASK_FORWARD_TO')}</div>
          <div className="option-forward">
            <div className="option-1" onClick={() => handleChangeStateModalForwardToWork(true)}>
              {t('LABEL_CHAT_TASK_FORWARD_TO_WORK')}
            </div>
            <div className="option-2" onClick={() => handleChangeStateModalForwardToMessage(true)}>
              {t('LABEL_CHAT_TASK_FORWARD_TO_MESSAGE')}
            </div>
          </div>
        </div>
      </DialogWrap >
      <ForwardMessageDialogWork
        isOpen={modalForwardToWork}
        handleClickClose={() => handleChangeStateModalForwardToWork(false)}
      />
      <ForwardMessageDialogMessage
        isOpen={modalForwardToMessage}
        handleClickClose={() => handleChangeStateModalForwardToMessage(false)}
      />
    </>
  );
}

export default ForwardMessageDialog;