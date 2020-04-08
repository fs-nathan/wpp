import { mdiAccount, mdiAccountCircle, mdiCalendar, mdiDownload, mdiScatterPlot } from '@mdi/js';
import Icon from '@mdi/react';
import { find, flattenDeep, get, isNil, join } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import CustomBadge from '../../../../components/CustomBadge';
import { DownloadPopover, TimeRangePopover, useTimes } from '../../../../components/CustomPopover';
import CustomTable from '../../../../components/CustomTable';
import LoadingBox from '../../../../components/LoadingBox';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import { Container, DateBox, LinkSpan, StateBox } from '../../../../components/TableComponents';
import './style.scss';

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
      });
    case 1:
      return ({
        color: '#ff9800',
        background: '#ff980038',
      });
    case 2:
      return ({
        color: '#fe0707',
        background: '#ff050524',
      });
    default:
      return ({
        color: '#53d7fc',
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

function AllTaskTable({
  expand, handleExpand,
  showHidePendings,
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
  const times = useTimes();

  return (
    <Container>
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
              disabled: !isNil(find(showHidePendings.pendings, pending => pending === get(project.project, 'id'))),
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
              stateCode={get(row, 'status_code')}
            >
              <div>
                <span>&#11044;</span>
                <span>
                  {get(row, 'status_name')}
                </span>
              </div>
            </StateBox>,
            align: 'left',
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
              {get(row, 'priority_name', '0')}
            </CustomBadge>,
            align: 'center',
            width: '10%',
          }, {
            label: () => <Icon path={mdiAccount} size={1} color={'rgb(102, 102, 102)'} />,
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
      </React.Fragment>
    </Container>
  )
}

export default AllTaskTable;