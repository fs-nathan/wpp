import React from 'react';
import { get } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ProgressBar from '../../../../components/ProgressBar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ColorButton from '../../../../components/ColorButton';
import { Container, SubContainer, ActionBox, } from '../../../../components/CustomDetailBox';
import { 
  ChartBox, ChartDrawer, ChartLegendBox, ChartTitle, CustomChart, 
} from '../../../../components/CustomDonutChart';
import Icon from '@mdi/react';
import { mdiSquare, mdiChevronLeft, } from '@mdi/js';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import EditProjectModal from '../../../ProjectGroupPage/Modals/EditProject';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_PROJECT } from '../../../../constants/events.js';
import { deleteProject } from '../../../../actions/project/deleteProject';
import './style.scss';

const ProjectName = ({ className = '', ...props }) => 
  <span 
    className={`view_Project_ProjectDetail___name ${className}`}
    {...props}
  />

const SubHeader = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_ProjectDetail___subheader ${className}`}
    {...props}
  />

const DateBox = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_ProjectDetail___date-box ${className}`}
    {...props}
  />

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
    case 'hidden':
      return ({
        color: '#20194d',
        name: 'Đang ẩn',
      })
    default:
      return ({
        color: 'orange',
        name: 'Đang chờ',
      });
  }
}

function displayDate(date) {
  if (
    (date instanceof Date && !isNaN(date))
  ) {
    return (
      <>
        <span>{date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</span>
        <span>{date.toLocaleDateString()}</span>
      </>
    );
  } else {
    return <span/>;
  }
}

function ProjectDetail({ detailProject, doDeleteProject, }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const history = useHistory();
  const { data: { project }, error: detailProjectError, loading: detailProjectLoading } = detailProject;
  const loading = detailProjectLoading;
  const error = detailProjectError;
  const [openEditProject, setOpenEditProject] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
    
  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);
  
  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push('/projects');
    };

    CustomEventListener(DELETE_PROJECT, historyPushHandler);
    
    return () => {
      CustomEventDispose(DELETE_PROJECT, historyPushHandler);
    };
  }, [history, projectId]);

  function handleDeleteProject(projectId) {
    doDeleteProject({ 
      projectId,
    });
  }
  
  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          title='Thông tin dự án'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/projects'),
            tooltip: 'Quay lại',
          }}
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <Container>
            <div>
              <SubContainer>
                <ChartBox>
                  <ChartDrawer>
                    <CustomChart 
                      type='donut'
                      options={{
                        legend: {
                          show: false,
                        },
                        plotOptions: {
                          pie: {
                            expandOnClick: false,
                          },
                        },
                        labels: [
                          'Công việc đang chờ', 
                          'Công việc đang làm', 
                          'Công việc quá hạn',
                          'Công việc hoàn thành',
                          'Công việc dừng',
                        ],
                        colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', 'black'],
                      }}
                      series={[
                        get(project, 'task_waiting', 0),
                        get(project, 'task_doing', 0),
                        get(project, 'task_expired', 0),
                        get(project, 'task_complete', 0),
                        get(project, 'task_stop', 0),
                      ]}
                      width={250}
                      height={250}
                    />
                    <ChartTitle>
                      {decodeStateName(get(project, 'visibility', true) === false ? 'hidden' : get(project, 'state_name')).name}
                    </ChartTitle>
                  </ChartDrawer>
                  <ProjectName>
                    {loading ? '...' : get(project, 'name', '')}
                  </ProjectName>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#ff9800'} />
                    <ColorTypo>Công việc đang chờ</ColorTypo>
                    <ColorTypo>{get(project, 'task_waiting', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03a9f4'} />
                    <ColorTypo>Công việc đang làm</ColorTypo>
                    <ColorTypo>{get(project, 'task_doing', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#f44336'} />
                    <ColorTypo>Công việc quá hạn</ColorTypo>
                    <ColorTypo>{get(project, 'task_expired', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03c30b'} />
                    <ColorTypo>Công việc hoàn thành</ColorTypo>
                    <ColorTypo>{get(project, 'task_complete', 0)}</ColorTypo>
                  </ChartLegendBox>
                </ChartBox>
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Tiến độ dự án</ColorTypo>
                </SubHeader>
                <DateBox>
                  <div>{displayDate(new Date(get(project, 'date_start')))}</div>
                  <div>{displayDate(new Date(get(project, 'date_end')))}</div>
                </DateBox>
                <ProgressBar 
                  percentDone={get(project, 'complete', 0)}
                  percentTarget={get(project, 'duration', 0)} 
                  colorDone={'#31b586'} 
                  colorTarget={'#fd7e14'}
                />
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Mô tả dự án</ColorTypo>
                </SubHeader>
                <ColorTextField 
                  value={get(project, 'description', '')}
                />
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
                </SubHeader>
                <AvatarCircleList users={get(project, 'members', [])} total={20} display={12}/>
              </SubContainer>
            </div>
            <ActionBox>
              <ColorButton onClick={() => setOpenEditProject(true)} variant='text' size='small' fullWidth>Chỉnh sửa</ColorButton>
              <ColorButton onClick={() => setAlert(true)} variant='text' variantColor='red' size='small' fullWidth>Xóa dự án</ColorButton>
            </ActionBox>
          </Container>
          <EditProjectModal curProject={project} open={openEditProject} setOpen={setOpenEditProject} />
          <AlertModal
            open={alert}
            setOpen={setAlert}
            content='Bạn chắc chắn muốn xóa?'
            onConfirm={() => handleDeleteProject(projectId)}
          />
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    detailProject: state.project.detailProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
