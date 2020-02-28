import React from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ProgressBar from '../../../../components/ProgressBar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ColorButton from '../../../../components/ColorButton';
import { Container, SubContainer, ActionBox } from '../../../../components/CustomDetailBox';
import { 
  ChartBox, ChartDrawer, ChartInfoBox, ChartTitle, CustomChart, 
} from '../../../../components/CustomDonutChart';
import { mdiChevronLeft, } from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
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

function ProjectDetail({ 
  project, 
  handleDeleteProject, handleOpenModal,
}) {

  const history = useHistory();
  
  return (
    <>
      {project.error !== null && (<ErrorBox />)}
      {project.error === null && (
        <LeftSideContainer
          title='Thông tin dự án'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/projects'),
            tooltip: 'Quay lại',
          }}
          loading={{
            bool: project.loading,
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
                        get(project.project, 'task_waiting', 0),
                        get(project.project, 'task_doing', 0),
                        get(project.project, 'task_expired', 0),
                        get(project.project, 'task_complete', 0),
                        get(project.project, 'task_stop', 0),
                      ]}
                      width={250}
                      height={250}
                    />
                    <ChartTitle>
                      {decodeStateName(
                        get(project.project, 'visibility', true) === false 
                          ? 'hidden' 
                          : get(project.project, 'state_name')
                      ).name}
                    </ChartTitle>
                  </ChartDrawer>
                  <ProjectName>
                    {project.loading ? '...' : get(project.project, 'name', '')}
                  </ProjectName>
                  <ChartInfoBox
                    data={
                      [{
                        color: '#ff9800',
                        title: 'Công việc đang chờ',
                        value: get(project.project, 'task_waiting', 0),
                      }, {
                        color: '#03a9f4',
                        title: 'Công việc đang làm',
                        value: get(project.project, 'task_doing', 0),
                      }, {
                        color: '#f44336',
                        title: 'Công việc quá hạn',
                        value: get(project.project, 'task_expired', 0),
                      }, {
                        color: '#03c30b',
                        title: 'Công việc hoàn thành',
                        value: get(project.project, 'task_complete', 0),
                      }, {
                        color: '#000',
                        title: 'Công việc dừng',
                        value: get(project.project, 'task_stop', 0),
                      }]
                    }
                  />
                </ChartBox>
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Tiến độ dự án</ColorTypo>
                </SubHeader>
                <DateBox>
                  <div>{get(project.project, 'date_start')}</div>
                  <div>{get(project.project, 'date_end')}</div>
                </DateBox>
                <ProgressBar 
                  percentDone={get(project.project, 'complete', 0)}
                  percentTarget={get(project.project, 'duration', 0)} 
                  colorDone={'#31b586'} 
                  colorTarget={'#fd7e14'}
                />
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Mô tả dự án</ColorTypo>
                </SubHeader>
                <ColorTextField 
                  value={get(project.project, 'description', '')}
                />
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
                </SubHeader>
                <AvatarCircleList users={get(project.project, 'members', [])} total={20} display={12}/>
              </SubContainer>
            </div>
            <ActionBox>
              <ColorButton 
                onClick={() => handleOpenModal('UPDATE', {
                  curProject: project.project
                })} 
                variant='text' 
                size='small' 
                fullWidth
              >Chỉnh sửa</ColorButton>
              <ColorButton 
                onClick={() => handleOpenModal('ALERT', {
                  content: 'Bạn chắc chắn muốn xóa?',
                  onConfirm: () => handleDeleteProject(project.project),
                })} 
                variant='text' 
                variantColor='red' 
                size='small' 
                fullWidth
              >Xóa dự án</ColorButton>
            </ActionBox>
          </Container>
        </LeftSideContainer>
      )}
    </>
  )
}

export default ProjectDetail;
