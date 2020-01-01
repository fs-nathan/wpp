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
import CreateNewTaskModal from '../../Modals/CreateNewTask';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
import { deleteTask } from '../../../../actions/task/deleteTask';

const Container = styled.div`
  grid-area: table;
`;

const ProgressBar = styled.div`
  max-width: 100px;
`;

const StyledBadge = styled(CustomBadge)`
  max-width: 70px;
`;

const StateBox = styled(({stateName, ...rest}) => <div {...rest} />)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div > span {
    font-size: 14px;
    color: ${props => props.stateName};
    &:first-child {
      margin-right: 6px;
    }
  }
  & > small {
    margin-top: 4px;
    font-size: 12px;
    margin-left: 20px;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > span {
    font-size: 14px;
    color: red;
  }
  & > small {
    margin-top: 4px;
    font-size: 12px;
  }
`;

const SettingContainer = styled.div`
  margin-right: 16px;
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

function decodeStateName(stateName) {
  switch (stateName) {
    case 'Waiting': 
      return ({
        color: 'orange',
        name: 'Đang chờ',
      });
    case 'Doing': 
      return ({
        color: 'green',
        name: 'Đang làm',
      });
    case 'Expired': 
      return ({
        color: 'red',
        name: 'Quá hạn',
      });
    default:
      return ({
        color: 'orange',
        name: 'Đang chờ',
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
    return <span>Không xác định</span>;
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
              subTitle: '',
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
                onClick: (row) => history.push(`/list-task-detail/`),
              },
            }}
            columns={[{
              label: 'Tên công việc',
              field: 'name',
            }, {
              label: 'Ưu tiên',
              field: (row) => <StyledBadge 
                                color={decodePriorityCode(get(row, 'priority_code', 0)).color}
                                background={decodePriorityCode(get(row, 'priority_code', 0)).background}
                              >
                                {get(row, 'priority_name', '')}  
                              </StyledBadge>,
              centered: true
            }, {
              label: 'Tiến độ',
              field: (row) => `${get(row, 'duration', 0)} ngày`,
            }, {
              label: 'Bắt đầu',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'start_time'), new Date(get(row, 'start_date')))}
                              </DateBox>,
            }, {
              label: 'Kết thúc',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'end_time'), new Date(get(row, 'end_date')))}
                              </DateBox>,
            }, {
              label: 'Hoàn thành',
              field: (row) => <ProgressBar>
                                <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />
                              </ProgressBar>,
            }, {
              label: 'Trạng thái',
              field: (row) => <StateBox stateName={decodeStateName(get(row, 'status_name', '')).color}>
                                <div>
                                  <span>&#11044;</span><span>{decodeStateName(get(row, 'status_name', '')).name}</span>
                                </div>
                              </StateBox>,
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
              centered: true
            }, {
              label: '',
              field: row => (
                <SettingButton
                  task={row}
                  onDeleteTask={handleDeleteTask}
                />
              )
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