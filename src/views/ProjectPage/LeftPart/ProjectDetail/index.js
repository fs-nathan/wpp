import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import Chart from 'react-apexcharts';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ProgressBar from '../../../../components/ProgressBar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import Icon from '@mdi/react';
import { mdiSquare } from '@mdi/js';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: auto; 
`;

const ChartBox = styled.div`
  padding: 10px;
`;

const ChartDrawer = styled.div`
  position: relative;
  height: 200px;
`;

const ChartTitle = styled.span`
  position: absolute;
  left: ${126.5}px;
  top: ${92.5}px;
  transform: translate(-50%, -50%);
  height: 90px;
  width: 90px;
  border-radius: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
`;

const ProjectName = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const ChartLegendBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > *:first-child {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const SubHeader = styled.div`
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding: 8px 0;
  margin: 8px 0
  display: flex;
  align-items: center;
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
`;

function displayDate(date) {
  if (
    (date instanceof Date && !isNaN(date))
  ) {
    return (
      <>
        <span>{date.getHours()}:{date.getMinutes}</span>
        <span>{date.toLocaleDateString()}</span>
      </>
    );
  } else {
    return <span>Không xác định</span>;
  }
}

function ProjectDetail({ detailProject }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const { data: { project }, error: detailProjectError, loading: detailProjectLoading } = detailProject;
  const loading = detailProjectLoading;
  const error = detailProjectError;
    
  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);
  
  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          title='Thông tin dự án'
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <Container>
            <div>
              <ChartBox>
                <ChartDrawer>
                  <Chart 
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
                      ],
                      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63'],
                    }}
                    series={[
                      get(project, 'task_waiting', 0),
                      get(project, 'task_doing', 0),
                      get(project, 'task_expired', 0),
                      get(project, 'task_complete', 0),
                    ]}
                    width={250}
                    height={250}
                  />
                  <ChartTitle>
                    Hoạt động
                  </ChartTitle>
                </ChartDrawer>
                <ProjectName>
                  {loading ? '...' : get(project, 'name', '')}
                </ProjectName>
                <ChartLegendBox>
                  <Icon path={mdiSquare} size={1} color={'#2E93fA'} />
                  <ColorTypo>Công việc đang chờ</ColorTypo>
                  <ColorTypo>{get(project, 'task_waiting', 0)}</ColorTypo>
                </ChartLegendBox>
                <ChartLegendBox>
                  <Icon path={mdiSquare} size={1} color={'#66DA26'} />
                  <ColorTypo>Công việc đang làm</ColorTypo>
                  <ColorTypo>{get(project, 'task_doing', 0)}</ColorTypo>
                </ChartLegendBox>
                <ChartLegendBox>
                  <Icon path={mdiSquare} size={1} color={'#546E7A'} />
                  <ColorTypo>Công việc quá hạn</ColorTypo>
                  <ColorTypo>{get(project, 'task_expired', 0)}</ColorTypo>
                </ChartLegendBox>
                <ChartLegendBox>
                  <Icon path={mdiSquare} size={1} color={'#E91E63'} />
                  <ColorTypo>Công việc hoàn thành</ColorTypo>
                  <ColorTypo>{get(project, 'task_complete', 0)}</ColorTypo>
                </ChartLegendBox>
              </ChartBox>
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
              <SubHeader>
                <ColorTypo color='gray' uppercase>Mô tả dự án</ColorTypo>
              </SubHeader>
              <ColorTextField 
                value={get(project, 'description', '')}
              />
              <SubHeader>
                <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
              </SubHeader>
              <AvatarCircleList users={get(project, 'members', [])} total={20} display={12}/>
            </div>
          </Container>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
