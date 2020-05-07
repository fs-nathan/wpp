import { mdiChevronLeft } from '@mdi/js';
import { clamp, get, isNaN } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import { ActionBox, Container, SubContainer } from '../../../../components/CustomDetailBox';
import { ChartBox, ChartDrawer, ChartInfoBox, ChartPlaceholder, ChartTitle, CustomChart } from '../../../../components/CustomDonutChart';
import CustomTextbox from '../../../../components/CustomTextbox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import ProgressBar from '../../../../components/ProgressBar';
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

function getExpectedProgress(startDate, endDate) {
  if (startDate === -1 || endDate === 1) {
    return 0;
  } else {
    const start = moment(startDate, 'DD-MM-YYYY').toDate();
    const end = moment(endDate, 'DD-MM-YYYY').toDate();
    const now = moment().toDate();
    const total = (end - start) / 1000;
    const current = (now - start) / 1000;
    return clamp(total === 0 || isNaN(current / total) ? 0 : parseInt((current / total) * 100), 0, 100);
  }
}

function ProjectDetail({
  project, route,
  handleDeleteProject, handleOpenModal,
}) {

  const history = useHistory();

  return (
    <>
      <LeftSideContainer
        title='Thông tin dự án'
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(route),
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
                      colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', '#000000'],
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
                    {get(project.project, 'state_name')}
                  </ChartTitle>
                  {
                    get(project.project, 'task_waiting', 0) +
                      get(project.project, 'task_doing', 0) +
                      get(project.project, 'task_expired', 0) +
                      get(project.project, 'task_complete', 0) +
                      get(project.project, 'task_stop', 0) === 0
                      ? <ChartPlaceholder />
                      : null
                  }
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
                      color: '#000000',
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
                <div>{get(project.project, 'date_start', -1)}</div>
                <div>{get(project.project, 'date_end', -1)}</div>
              </DateBox>
              <ProgressBar
                percentDone={get(project.project, 'complete', 0)}
                percentTarget={
                  getExpectedProgress(
                    get(project.project, 'date_start', -1),
                    get(project.project, 'date_end', -1)
                  )
                }
                colorDone={'#31b586'}
                colorTarget={'#fd7e14'}
              />
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>Mô tả dự án</ColorTypo>
              </SubHeader>
              <CustomTextbox
                value={get(project.project, 'description', '')}
                isReadOnly={true}
              />
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
              </SubHeader>
              <AvatarCircleList users={get(project.project, 'members', [])} total={20} display={12} />
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
                selectedProject: project.project
              })}
              variant='text'
              variantColor='red'
              size='small'
              fullWidth
            >Xóa dự án</ColorButton>
          </ActionBox>
        </Container>
      </LeftSideContainer>
    </>
  )
}

export default ProjectDetail;
