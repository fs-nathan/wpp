import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  mdiDownload,
  mdiScatterPlot,
  mdiCalendar,
  mdiAccount,
  mdiAccountCircle,
  mdiDotsVertical,
} from '@mdi/js';
import { Context as ProjectPageContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import AlertModal from '../../../../components/AlertModal';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import { Container, SettingContainer, LinkSpan, StateBox, DateBox } from '../../../../components/TableComponents';
import CreateNewTaskModal from '../../Modals/CreateNewTask';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
import { deleteTask } from '../../../../actions/task/deleteTask';

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  & > * {
    &:not(:first-child) {
      margin-left: 8px;
      color: #8b8b8b;
    }
    &:first-child {
      color: #2196F3;
    }
  }
`;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:   
      return ({
        color: '#4caf50',
        background: '#4caf5042',
        name: 'Thấp',
      });
    case 1: 
      return ({
        color: '#ff9800',
        background: '#ff980038',
        name: 'Trung bình',
      });
    case 2: 
      return ({
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao',
      });
    default:
      return ({
        color: '#53d7fc',
        name: 'Thấp',
      });
  }
}

function displayDate(time, date) {
  if (
    (date instanceof Date && !isNaN(date))
  ) {
    return (
      <>
        <span>{time}</span>
        <span>{date.toLocaleDateString()}</span>
      </>
    );
  } else {
    return <span />;
  }
}

const SettingButton = ({
  task,
  onDeleteTask,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alert, setAlert] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(evt) {
    setAnchorEl(null);
  }

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={evt => setAlert(true)}>Xóa</MenuItem>
      </Menu>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content="Bạn chắc chắn muốn xóa công việc?"
        onCancle={handleClose}
        onConfirm={() => {
          handleClose();
          onDeleteTask(task);
        }}
      />
    </SettingContainer>
  );
};

function AllTaskTable({ 
  expand, handleExpand, 
  handleSubSlide,
  listTask, detailProject,
  doShowProject, doHideProject,
  doDeleteTask,
}) {

  const { setProjectId } = React.useContext(ProjectPageContext);
  const { projectId } = useParams();
  const history = useHistory();

  const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
  const { data: { project }, loading: detailProjectLoading, error: detailProjectError } = detailProject;

  const loading = listTaskLoading || detailProjectLoading;
  const error = listTaskError || detailProjectError;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  function handleShowHideProject(show = true) {
    if (show) doHideProject({ projectId, })
    else doShowProject({ projectId, })
  }

  function handleDeleteTask(task) {
    doDeleteTask({
      taskId: get(task, 'id'),
    });
  }

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: 'Danh sách công việc',
              subTitle: () => (
                <SubTitle>
                  <span>Table</span>
                  <span>Chat</span>
                  <span>Grant</span>
                </SubTitle>
              ),
              subActions: [{
                label: 'Thành viên', 
                iconPath: mdiAccountCircle,
                onClick: (evt) => handleSubSlide(1),
                noExpand: true,
              }, {
                label: 'Nhóm việc',
                iconPath: mdiScatterPlot,
                onClick: (evt) => handleSubSlide(2),
                noExpand: true,
              }, {
                label: 'Tải xuống',
                iconPath: mdiDownload,
                onClick: (evt) => null,
              }, {
                label: 'Năm 2019',
                iconPath: mdiCalendar,
                onClick: (evt) => null,
              }],
              mainAction: {
                label: '+ Tạo công việc',
                onClick: (evt) => setOpen(true),  
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              moreMenu: [{
                label: 'Cài đặt bảng',
                onClick: () => null,
              }, {
                label: `${get(project, 'visibility') ? 'Ẩn dự án' : 'Bỏ ẩn dự án'}`,
                onClick: () => handleShowHideProject(get(project, 'visibility')),
              }],
              grouped: {
                bool: true,
                id: 'id',
                label: (group) => get(group, 'id') === 'default' ? 'Chưa phân loại' : get(group, 'name'),
                item: 'tasks',
              },
              draggable: {
                bool: false,
              },
              loading: {
                bool: loading,
                component: () => <LoadingBox />,
              },
              row: {
                id: 'id',
              },
            }}
            columns={[{
              label: 'Tên công việc',
              field: (row) => <LinkSpan onClick={evt => history.push(`/list-task-detail/`)}>{get(row, 'name', '')}</LinkSpan>,
              align: 'left',
              width: '25%',
            }, {
              label: 'Ưu tiên',
              field: (row) => <CustomBadge 
                                color={decodePriorityCode(get(row, 'priority_code', 0)).color}
                                background={decodePriorityCode(get(row, 'priority_code', 0)).background}
                              >
                                {get(row, 'priority_name', '')}  
                              </CustomBadge>,
              align: 'center',
              width: '10%',
            }, {
              label: 'Tiến độ',
              field: (row) => `${get(row, 'duration', 0)} ngày`,
              align: 'center',
              width: '10%',
            }, {
              label: 'Bắt đầu',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'start_time'), new Date(get(row, 'start_date')))}
                              </DateBox>,
              align: 'left',
              width: '10%',
            }, {
              label: 'Kết thúc',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'end_time'), new Date(get(row, 'end_date')))}
                              </DateBox>,
              align: 'left',
              width: '10%',
            }, {
              label: 'Hoàn thành',
              field: (row) => <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />,
              align: 'center',
              width: '10%',
            }, {
              label: 'Trạng thái',
              field: (row) => <StateBox
                  stateName={get(row, 'status_name', '')}
                >
                  <div>
                    <span>&#11044;</span>
                    <span>
                      {get(row, 'status_name', '')}
                    </span>
                  </div>
                </StateBox>,
              align: 'center',
              width: '10%',
            }, {
              label: () => <Icon path={mdiAccount} size={1} color={'rgb(102, 102, 102)'}/>,
              field: row => <AvatarCircleList 
                              users={
                                get(row, 'members', [])
                                .map(member => ({
                                  name: get(member, 'name'),
                                  avatar: get(member, 'avatar'),
                                }))
                              } 
                              display={3} 
                            />,
              align: 'center',
              width: '10%',
            }, {
              label: '',
              field: row => (
                <SettingButton
                  task={row}
                  onDeleteTask={handleDeleteTask}
                />
              ),
              align: 'center',
              width: '5%',
            }]}
            data={tasks}
          />
          <CreateNewTaskModal open={open} setOpen={setOpen}/>
        </React.Fragment>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    listTask: state.task.listTask,
    detailProject: state.project.detailProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDeleteTask: ({ taskId }) => dispatch(deleteTask({ taskId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);