import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { forwardChat, forwardMessage, loadListTask } from 'actions/chat/chat';
import clsx from 'clsx';
import DialogWrapForwardToMessage from 'components/DialogWrapForwardToMessage';
import SearchInput from 'components/SearchInput';
import React, { useState, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectBody from 'views/JobDetailPage/ListPart/ListProject/ListProjectBody';
import './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import AvatarSquareGroup from 'components/AvatarSquareGroup';
import { currentColorSelector } from 'views/Chat/selectors';

function ForwardMessageDialogMessage({ isOpen, handleClickClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const listTasks = useSelector(state => state.chat.listTasks);
  const isLoading = useSelector(state => state.chat.isLoadingForward);
  const contentForward = useSelector(state => state.chat.contentForward);
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [sending, setSending] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const timeoutRef = useRef(null); 
  const membersOriginnal = useSelector(state => state.taskDetail.listDetailTask.listDataNotRoom);
  const [members, setMembers] = useState(membersOriginnal);
  const appColor = useSelector(currentColorSelector)

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

  React.useEffect(() => {
    if (membersOriginnal) {
      setMembers(membersOriginnal)
    }
  }, [membersOriginnal]);


  // const handleClose = () => {
  //   dispatch(forwardMessage(false));
  // };

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


  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
    const value = evt.target.value
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      let membersTemp = []
      membersOriginnal.map(e => {
        if (String(e.name).toLowerCase().indexOf(String(value).toLowerCase()) >= 0) {
          membersTemp.push(e)
        }
      })
      setMembers(membersTemp)
    }, 300);    
  }

  return (
    <DialogWrapForwardToMessage
      title={t('LABEL_CHAT_TASK_FORWARD')}
      isOpen={isOpen}
      handleClickClose={handleClickClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClickClose}
      maxWidth="xl"
      className="modal-forward-message-to-member"
      scroll="body"
    // isLoading={isLoading}
    >
      <div className="step-list-parent">
        <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <div className="forward-messsage-wrap">
          <div className="forward-messsage-title">
            {t('LABEL_FORWARD_MESSAGE_MEMBERS')}
          </div>
          <div className="forward-messsage-list">
            {
              members.map(e => e.type_chat === 1 && (
                <div className="forward-messsage-list-line" key={e.id}>
                  <div className="step-avatar avatar-member">
                    <AvatarSquareGroup images={e.members} />
                  </div>
                  <div className="step-name">
                    {e.name}
                  </div>
                  <div className="step-send">
                    {isLoading && sending === e.id ?
                      <CircularProgress size={20} className="forward-messsage--loading" />
                      :
                      <button style={{background: appColor}} onClick={onClickSend(e.id)}>{t('LABEL_CHAT_TASK_GUI')}</button>
                    }
                  </div>
                </div>
              ))
            }
            <div className="forward-messsage-title">
              {t('LABEL_FORWARD_MESSAGE_GROUP')}
            </div>
            <div className="forward-messsage-list">
              {
                members.map(e => e.type_chat === 2 && (
                  <div className="forward-messsage-list-line" key={e.id}>
                    <div className="step-avatar">
                      <AvatarSquareGroup images={e.members} />
                    </div>
                    <div className="step-name">
                      {e.name}
                    </div>
                    <div className="step-send">
                      {isLoading && sending === e.id ?
                        <CircularProgress size={20} className="forward-messsage--loading" />
                        :
                        <button style={{background: appColor}} onClick={onClickSend(e.id)}>{t('LABEL_CHAT_TASK_GUI')}</button>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </DialogWrapForwardToMessage>
  );
}

export default ForwardMessageDialogMessage;