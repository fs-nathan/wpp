import React from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { 
  ChartBox, ChartDrawer, ChartLegendBox, ChartTitle, CustomChart 
} from '../../../../components/CustomDonutChart';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import { Container, SubContainer, } from '../../../../components/CustomDetailBox';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSquare } from '@mdi/js';
import { connect } from 'react-redux';
import { detailDefaultGroup } from '../../../../actions/projectGroup/detailDefaultGroup';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import './style.scss';

const ProjectGroupName = ({ className = '', ...props }) => 
  <span 
    className={`view_ProjectGroup_Detail___name ${className}`}
    {...props}
  />;

const SubHeader = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Detail___sub-header ${className}`}
    {...props}
  />;

function DefaultGroupDetail({ 
  detailDefaultGroup, 
}) {
  
  const history = useHistory();
  const { data: { projectGroup }, error, loading } = detailDefaultGroup;
  
  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/projects'),
            tooltip: 'Quay lại',
          }}
          title='Chi tiết nhóm dự án'
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
                        get(projectGroup, 'task_waiting', 0),
                        get(projectGroup, 'task_doing', 0),
                        get(projectGroup, 'task_expired', 0),
                        get(projectGroup, 'task_complete', 0),
                        get(projectGroup, 'task_stop', 0),
                      ]}
                      width={250}
                      height={250}
                    />
                    <ChartTitle>
                      Hoạt động
                    </ChartTitle>
                  </ChartDrawer>
                  <ProjectGroupName>
                    {loading ? '...' : get(projectGroup, 'name', '')}
                  </ProjectGroupName>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#ff9800'} />
                    <ColorTypo>Công việc đang chờ</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_waiting', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03a9f4'} />
                    <ColorTypo>Công việc đang làm</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_doing', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#f44336'} />
                    <ColorTypo>Công việc quá hạn</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_expired', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03c30b'} />
                    <ColorTypo>Công việc hoàn thành</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_complete', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#black'} />
                    <ColorTypo>Công việc dừng</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_stop', 0)}</ColorTypo>
                  </ChartLegendBox>
                </ChartBox>
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Mô tả</ColorTypo>
                </SubHeader>
                <ColorTextField 
                  value={get(projectGroup, 'description', '')}
                />
              </SubContainer>
              <SubContainer className='view_DefaultGroup_Detail___bottom-box'>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
                </SubHeader>
                <AvatarCircleList users={get(projectGroup, 'members', [])} total={20} display={12}/>
              </SubContainer>
            </div>
          </Container>
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    detailDefaultGroup: state.projectGroup.detailDefaultGroup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailDefaultGroup: (quite) => dispatch(detailDefaultGroup(quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultGroupDetail);
