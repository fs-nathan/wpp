import React from 'react';
import { get, join, flattenDeep } from 'lodash';
import { useHistory } from 'react-router-dom';
import { TimeRangePopover, times, DownloadPopover } from '../../../../components/CustomPopover';
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
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import { 
  Container, SettingContainer, LinkSpan, StateBox, DateBox 
} from '../../../../components/TableComponents';
import './style.scss'

const SubTitle = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_AllTaskTable___subtitle ${className}`}
    {...props}
  />;

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

function displayDate(time, date, type) {
  return (
    <>
      {type === 2 && <span>Không yêu cầu</span>}
      {type === 0 && <span>{time}</span>}
      {type <= 1 && <span>{date}</span>}
    </>
  );
}

const SettingButton = ({
  task,
  setCurrentSettingTask, setCurrentSettingAnchorEl,
}) => {

  function handleClick(evt) {
    setCurrentSettingAnchorEl(evt.currentTarget);
    setCurrentSettingTask(task);
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
    </SettingContainer>
  );
};

function AllTaskTable({ 
  expand, handleExpand, 
  handleSubSlide,
  tasks, project,
  handleShowOrHideProject,
  handleDeleteTask,
  handleSortTask,
  handleOpenModal,
  bgColor, timeType,
  handleTimeType, handleTimeRange,
}) {

  const history = useHistory();

  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);

  const [currentSettingAnchorEl, setCurrentSettingAnchorEl] = React.useState(null);
  const [currentSettingTask, setCurrentSettingTask] = React.useState(null);
  
  return (
    <Container>
      {tasks.error !== null && <ErrorBox />}
      {tasks.error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: 'Danh sách công việc',
              subTitle: () => (
                <SubTitle>
                  <span onClick={evt => history.push(`/list-task-detail/${get(project.project, 'id')}`)}>Chat</span>
                  <span>Table</span>
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
                onClick: (evt) => setDownloadAnchor(evt.currentTarget)
              }, {
                label: times[timeType].title,
                iconPath: mdiCalendar,
                onClick: evt => setTimeAnchor(evt.currentTarget)
              }],
              mainAction: {
                label: '+ Tạo công việc',
                onClick: (evt) => handleOpenModal('CREATE'),  
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              moreMenu: [{
                label: 'Cài đặt dự án',
                onClick: () => handleOpenModal('SETTING', {
                  curProject: project.project,
                }),
              }, {
                label: `${get(project.project, 'visibility') ? 'Ẩn dự án' : 'Bỏ ẩn dự án'}`,
                onClick: () => handleShowOrHideProject(project.project),
              }],
              grouped: {
                bool: true,
                id: 'id',
                label: (group) => get(group, 'id') === 'default' ? 'Chưa phân loại' : get(group, 'name'),
                item: 'tasks',
              },
              draggable: {
                bool: true,
                onDragEnd: result => {
                  const { source, destination, draggableId } = result;
                  if (!destination) return;
                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  ) return;
                  handleSortTask(draggableId, destination.droppableId, destination.index);
                }, 
              },
              loading: {
                bool: tasks.loading,
                component: () => <LoadingBox />,
              },
              row: {
                id: 'id',
              },
            }}
            columns={[{
              label: 'Tên công việc',
              field: (row) => <LinkSpan onClick={evt => {
                history.push(`/list-task-detail/${get(project.project, 'id')}?task_id=${row.id}`);
              }}>{get(row, 'name', '')}</LinkSpan>,
              align: 'left',
              width: '25%',
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
              label: 'Tiến độ',
              field: (row) => `${get(row, 'duration_value', 0)} ${get(row, 'duration_unit', 'ngày')}`,
              align: 'center',
              width: '8%',
            }, {
              label: 'Bắt đầu',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'start_time'), get(row, 'start_date'), get(row, 'type_time'))}
                              </DateBox>,
              align: 'left',
              width: '10%',
            }, {
              label: 'Kết thúc',
              field: (row) => <DateBox>
                                {displayDate(get(row, 'end_time'), get(row, 'end_date'), get(row, 'type_time'))}
                              </DateBox>,
              align: 'left',
              width: '10%',
            }, {
              label: 'Hoàn thành',
              field: (row) => <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />,
              align: 'center',
              width: '15%',
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
              label: () => <IconButton size="small" disabled><Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0)" /></IconButton>,
              field: row => (
                <SettingButton
                  task={row}
                  setCurrentSettingAnchorEl={setCurrentSettingAnchorEl}
                  setCurrentSettingTask={setCurrentSettingTask}
                />
              ),
              align: 'center',
              width: '2%',
            }]}
            data={tasks.tasks}
          />
          <DownloadPopover 
            anchorEl={downloadAnchor}
            setAnchorEl={setDownloadAnchor}
            fileName='tasks'
            data={flattenDeep(
              tasks.tasks.map(groupTask => 
                get(groupTask, 'tasks', [])
                  .map(task => ({
                    id: get(task, 'id', ''),
                    groupTask: get(groupTask, 'name', ''),
                    name: get(task, 'name', ''),
                    status: get(task, 'status_name', ''),
                    duration: get(task, 'duration_value', 0) + ' ' + get(task, 'duration_unit', ''),
                    start_time: get(task, 'start_time', ''),
                    start_date: get(task, 'start_date', ''),
                    end_time: get(task, 'end_time', ''),
                    end_date: get(task, 'end_date', ''),
                    progress: get(task, 'complete', 0) + '%',
                    priority: get(task, 'priority_name', ''),
                    members: join(
                      get(task, 'members', [])
                        .map(member => get(member, 'name')),
                      ','
                    )
                  }))
              )
            )}
          />
          <TimeRangePopover 
            bgColor={bgColor}
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType} 
            handleTimeRange={(timeType, startDate, endDate) => {
              handleTimeType(timeType)
              handleTimeRange(startDate, endDate)
            }}
          />
          <Menu
            id="simple-menu"
            anchorEl={currentSettingAnchorEl}
            keepMounted
            open={Boolean(currentSettingAnchorEl)}
            onClose={evt => setCurrentSettingAnchorEl(null)}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={evt => {
              setCurrentSettingAnchorEl(null);
              handleOpenModal('ALERT', {
                content: "Bạn chắc chắn muốn xóa công việc?",
                onConfirm: () => handleDeleteTask(currentSettingTask),
              });
            }}>Xóa</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </Container>
  )
}

export default AllTaskTable;