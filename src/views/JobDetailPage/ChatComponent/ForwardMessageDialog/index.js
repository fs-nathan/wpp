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

function ForwardMessageDialog({ }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const listTasks = useSelector(state => state.chat.listTasks);
  const isOpenForward = useSelector(state => state.chat.isOpenForward);
  const contentForward = useSelector(state => state.chat.contentForward);
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchKey, setSearchKey] = useState('');
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
      dispatch(forwardChat(
        taskId,
        contentForward.id,
        task
      ))
      handleClose();
    }
  }

  function onChangeKey(evt) {
    setSearchKey(evt.target.value)
  }

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_CHIA_SE')}
      isOpen={isOpenForward}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClose}
      maxWidth="xl"
      isOneButton
      className="ForwardMessageDialog"
      scroll="body"
    >
      <div className="ForwardMessageDialog--content" >
        <div className="ForwardMessageDialog--border">
          <div className="ForwardMessageDialog--title">{t('LABEL_CHAT_TASK_CHON_DU_AN')}</div>
          <div style={{ margin: '10px 10px 0 10px' }}>
            <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_DU_AN')} value={searchKey} onChange={onChangeKey} />
          </div>
          <div className="ForwardMessageDialog--container">
            <Scrollbars
              // className="ForwardMessageDialog--body"
              // renderView={props => <div {...props} className="ForwardMessageDialog--scroll" />}
              autoHide autoHideTimeout={500} autoHideDuration={200}>
              {data.map(group => {
                return (
                  <div key={group.id}>
                    <ExpansionPanel className="listProject--project-panel" defaultExpanded>
                      <ExpansionPanelSummary
                        expandIcon={<Icon path={mdiMenuUp} size={1} />}
                        id="panel1bh-header"
                      >
                        <ListProjectBody subPrimary={group.name.toUpperCase()} />
                      </ExpansionPanelSummary>
                      <MuiExpansionPanelDetails className="listProject--project-panel-detail">
                        {group.projects.map((project, projectIdx) => (
                          <div
                            key={projectIdx}
                            className={clsx("projectItem", { "projectItem__selected": project.id === selectedProject.id })}
                            onClick={onClickProject(project)}
                          >
                            {project.name}
                          </div>
                        ))}
                      </MuiExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>
        <div className="ForwardMessageDialog--taskList">
          <div className="ForwardMessageDialog--title">{t('LABEL_CHAT_TASK_DANH_SACH_CONG_VIEC')}</div>
          <div className="ForwardMessageDialog--subTitle">{t('LABEL_CHAT_TASK_TEN_CONG_VIEC')}</div>
          <div className="ForwardMessageDialog--body">
            <Scrollbars
              renderView={props => <div {...props} className="ForwardMessageDialog--scroll" />}
              autoHide autoHideTimeout={500} autoHideDuration={200}>
              {listTasks.map(taskGroup => (
                <div className="ForwardMessageDialog--taskGroup" key={taskGroup.id}>
                  <div className="ForwardMessageDialog--taskGroupTitle">
                    {taskGroup.name}
                  </div>
                  {
                    taskGroup.tasks.map(task => (
                      <div className="ForwardMessageDialog--task" key={task.id}>
                        {task.name}
                        <button onClick={onClickSend(task.id)} className="ForwardMessageDialog--sendButton">{t('LABEL_CHAT_TASK_GUI')}</button>
                      </div>
                    ))
                  }
                </div>
              ))}
            </Scrollbars>
          </div>
        </div>
      </div>
    </DialogWrap >
  );
}

export default ForwardMessageDialog;