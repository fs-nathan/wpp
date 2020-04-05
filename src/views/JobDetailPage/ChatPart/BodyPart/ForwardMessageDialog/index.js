import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { forwardChat, loadListTask } from 'actions/chat/chat';
import clsx from 'clsx';
import DialogWrap from 'components/DialogWrap';
import SearchInput from 'components/SearchInput';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectBody from 'views/JobDetailPage/ListPart/ListProject/ListProjectBody';
import './styles.scss';

function ForwardMessageDialog({ setOpen, isOpen, chat }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const listTasks = useSelector(state => state.chat.listTasks);
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  const [selectedProject, setSelectedProject] = useState(0);
  let data = [];
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }
  const handleClose = () => {
    setOpen(false);
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
        chat.id,
        task
      ))
      setOpen(false);
    }
  }

  return (
    <DialogWrap
      title={'Thành viên công việc'}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={"Thoát"}
      onClickSuccess={handleClose}
      maxWidth="xl"
      isOneButton
    >
      <div className="ForwardMessageDialog" >
        <div className="ForwardMessageDialog--border">
          <div className="ForwardMessageDialog--title">
            Chọn dự án
          </div>
          <div >
            <div style={{ margin: '10px 10px 0 10px' }}>
              <SearchInput placeholder='Tìm thành viên' />
            </div>
            <div className="table-scroll-add-member">
              <Scrollbars className="listProject--body"
                renderView={props => <div {...props} className="listProject--container" />}
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
        </div>
        <div>
          <div className="ForwardMessageDialog--title">
            Danh sách công việc
          </div>
          {listTasks.map(taskGroup => (
            <div className="ForwardMessageDialog--taskGroup" key={taskGroup.id}>
              <div className="ForwardMessageDialog--taskGroupTitle">
                {taskGroup.name}
              </div>
              {
                taskGroup.tasks.map(task => (
                  <div className="ForwardMessageDialog--task" key={task.id}>
                    {task.name}
                    <button onClick={onClickSend(task.id)} className="ForwardMessageDialog--sendButton">Gửi</button>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </DialogWrap>
  );
}

export default ForwardMessageDialog;