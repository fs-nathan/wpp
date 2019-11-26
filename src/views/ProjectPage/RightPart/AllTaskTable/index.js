import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  IconButton, Menu, MenuItem
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDownload,
  mdiScatterPlot,
  mdiCalendar,
  mdiAccount,
  mdiAccountCircle,
  mdiShieldAccount,
} from '@mdi/js';
import { Context as ProjectPageContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import CustomAvatar from '../../../../components/CustomAvatar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import TaskGroupSlide from '../../LeftPart/TaskGroupSlide';
import ProjectMemberSlide from '../../LeftPart/ProjectMemberSlide';


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

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:   
      return ({
        color: '#4a96ba',
        name: 'Thấp',
      });
    case 1: 
      return ({
        color: '#c49c56',
        name: 'Trung bình',
      });
    case 2: 
      return ({
        color: '#d63340',
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
    case 'waiting': 
      return ({
        color: 'orange',
        name: 'Đang chờ',
      });
    case 'doing': 
      return ({
        color: 'green',
        name: 'Đang làm',
      });
    case 'expired': 
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

function AllTaskTable({ 
  expand, handleExpand, 
  handleSubSlide,
  listTask, detailProject, 
}) {

  const { setProjectId } = React.useContext(ProjectPageContext);
  const { projectId } = useParams();

  const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
  const { data: { project }, loading: detailProjectLoading, error: detailProjectError } = detailProject;

  const loading = listTaskLoading || detailProjectLoading;
  const error = listTaskError || detailProjectError;

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: `${loading ? '...' : projectId ? get(project, 'name', '') : ''}`,
              subTitle: '',
              subActions: [{
                label: 'Thành viên', 
                iconPath: mdiAccountCircle,
                onClick: (evt) => handleSubSlide(true, ProjectMemberSlide),
              }, {
                label: 'Nhóm việc',
                iconPath: mdiScatterPlot,
                onClick: (evt) => handleSubSlide(true, TaskGroupSlide),
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
                onClick: (evt) => null,  
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              moreMenu: [{
                label: 'Cài đặt bảng',
                onClick: () => null,
              }, {
                label: 'Sửa dự án',
                onClick: () => null,
              }, {
                label: 'Ẩn dự án',
                onClick: () => null,
              }, {
                label: 'Xóa dự án',
                onClick: () => null,
              }],
              grouped: {
                bool: true,
                id: 'id',
                label: 'name',
                item: 'tasks',
              },
              draggable: {
                bool: false,
              },
              loading: {
                bool: loading,
                component: () => <LoadingBox />,
              },
            }}
            columns={[{
              label: () => <Icon path={mdiShieldAccount} size={1} color={'rgb(102, 102, 102)'}/>,
              field: (row) => <CustomAvatar src={get(row, 'user_create.avatar')} alt='user create avatar' />,
            }, {
              label: 'Tên công việc',
              field: 'name',
            }, {
              label: 'Ưu tiên',
              field: (row) => <StyledBadge color={decodePriorityCode(get(row, 'priority_code', 0)).color}>
                                {decodePriorityCode(get(row, 'priority_code', 0)).name}  
                              </StyledBadge>,
            }, {
              label: 'Tiến độ',
              field: (row) => `${get(row, 'duration', 0)} ngày`,
            }, {
              label: 'Bắt đầu',
              field: (row) => <DateBox>
                                {displayDate(new Date(get(row, 'start_time')), new Date(get(row, 'start_date')))}
                              </DateBox>,
            }, {
              label: 'Kết thúc',
              field: (row) => <DateBox>
                                {displayDate(new Date(get(row, 'end_time')), new Date(get(row, 'end_date')))}
                              </DateBox>,
            }, {
              label: 'Hoàn thành',
              field: (row) => <ProgressBar>
                                <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />
                              </ProgressBar>,
            }, {
              label: 'Trạng thái',
              field: (row) => <StateBox stateName={decodeStateName(get(row, 'state_name', '')).color}>
                                <div>
                                  <span>&#11044;</span><span>{decodeStateName(get(row, 'state_name', '')).name}</span>
                                </div>
                                <small>
                                  {get(row, 'state_name', '') === 'expired' ? get(row, 'day_expired', 0) : get(row, 'day_implement', 0)} ngày
                                </small>
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
            }]}
            data={tasks}
          />
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);