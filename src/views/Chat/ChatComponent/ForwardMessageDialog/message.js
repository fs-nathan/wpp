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
import styled from 'styled-components';
import {doCreateThreadChatPrivate, getAllThreadChat} from "actions/chat/threadChat";

const StyledDiv = styled.div`
  .tab-selected {
    background: ${props => props.selectedColor}!important;
    color: #fff!important
  }
`

function ForwardMessageDialogMessage({ isOpen, handleClickClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const projectId = useSelector(
    (state) => state.system.profile.group_chat_id
  );
  const listTasks = useSelector(state => state.chat.listTasks);
  const isLoading = useSelector(state => state.chat.isLoadingForward);
  const contentForward = useSelector(state => state.chat.contentForward);
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [sending, setSending] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateThread, setCreatingThread] = useState(false)
  const timeoutRef = useRef(null); 
  const [membersOriginnal, setMembersOriginnal] = useState([]);
  const [members, setMembers] = useState(membersOriginnal);
  const appColor = useSelector(currentColorSelector)
  const [tabActive, setTabActive] = useState(1);
  const numberMember = members ? members.filter(e => e.type_chat === 1).length : 0
  const numberGroup = members ? members.filter(e => e.type_chat === 2).length : 0

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
    if (projectId) {
      fetchListThreadChat()
    }
  }, [projectId]);


  // const handleClose = () => {
  //   dispatch(forwardMessage(false));
  // };

  function onClickProject(project) {
    return () => {
      setSelectedProject(project)
      dispatch(loadListTask(project.id))
    }
  }

  const runForwardChat = (task) => {
    dispatch(forwardChat(
      taskId,
      contentForward.id,
      task
    ))
  }

  async function onClickToCreateThreadChat(task) {
    if (task && task.members.length) {
      try {
        const res = await doCreateThreadChatPrivate({ member_id: task.members[0].id });
        return res
      } catch (error) {
        return false
      }
    }
  }

  function onClickSend(task) {
    return () => {
      if (isLoading) return;
      setSending(task.id ? task.id : task.uuid)
      if (task.id) {
        runForwardChat(task.id)
      } else {
        setCreatingThread(true)
        onClickToCreateThreadChat(task).then(res => {
          if (res) {
            runForwardChat(res.data.task_id)
          }
          setSending(null)
          setCreatingThread(false)
        })
      }
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

  async function fetchListThreadChat() {
    try {
      const res = await getAllThreadChat({ project_id: projectId, type_data: "not-room" });
      setMembersOriginnal(res.data.tasks)
      setMembers(res.data.tasks)
    } catch (error) {
      return false
    }
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
        <StyledDiv selectedColor={appColor} className="tab-category-forward-chat-to-person">
          <button onClick={() => setTabActive(1)} className={tabActive === 1 ? "tab-selected" : ""}>{t('LABEL_FORWARD_MESSAGE_MEMBERS')} ({numberMember})</button>
          <button onClick={() => setTabActive(2)} className={tabActive === 2 ? "tab-selected" : ""}>{t('LABEL_FORWARD_MESSAGE_GROUP')} ({numberGroup})</button>
        </StyledDiv>
          <div className="forward-messsage-wrap">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <div className="forward-messsage-list">
                {
                  members.map(e => e.type_chat === tabActive && (
                    <div className="forward-messsage-list-line" key={e.id ? e.id : e.uuid}>
                      <div className={`step-avatar ${tabActive === 1 ? "avatar-member" : ""}`}>
                        <AvatarSquareGroup images={e.members} />
                      </div>
                      <div className="step-name">
                        {e.name}
                      </div>
                      <div className="step-send">
                        {(isLoading || isCreateThread) && (sending === e.id || sending === e.uuid) ?
                          <CircularProgress size={20} className="forward-messsage--loading" />
                          :
                          <button style={{background: appColor}} onClick={onClickSend(e)}>{t('LABEL_CHAT_TASK_GUI')}</button>
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </Scrollbars>
        </div>
      </div>
    </DialogWrapForwardToMessage>
  );
}

export default ForwardMessageDialogMessage;