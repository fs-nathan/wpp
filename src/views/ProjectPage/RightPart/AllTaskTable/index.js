import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import CreateNewTaskModal from '../../Modals/CreateNewTask';

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
  console.log(time, date)
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
  const { loading: detailProjectLoading, error: detailProjectError } = detailProject;

  const loading = listTaskLoading || detailProjectLoading;
  const error = listTaskError || detailProjectError;

  const [open, setOpen] = React.useState(false);

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
              center: true,
            }, {
              label: 'Tên công việc',
              field: 'name',
            }, {
              label: 'Ưu tiên',
              field: (row) => <StyledBadge 
                                color={decodePriorityCode(get(row, 'priority_code', 0)).color}
                                background={decodePriorityCode(get(row, 'priority_code', 0)).background}
                              >
                                {decodePriorityCode(get(row, 'priority_code', 0)).name}  
                              </StyledBadge>,
              center: true,
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
              center: true,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);