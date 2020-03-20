import React from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { 
  ChartBox, ChartDrawer, ChartInfoBox, ChartTitle, CustomChart, ChartPlacedolder
} from '../../../../components/CustomDonutChart';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import { Container, SubContainer, } from '../../../../components/CustomDetailBox';
import { mdiChevronLeft } from '@mdi/js';
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
  group, 
}) {
  
  const history = useHistory();
  
  return (
    <React.Fragment>
      {group.error !== null && (<ErrorBox />)}
      {group.error === null && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/projects'),
            tooltip: 'Quay lại',
          }}
          title='Chi tiết nhóm dự án'
          loading={{
            bool: group.loading,
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
                          'Dự án đang chờ', 
                          'Dự án đang làm', 
                          'Dự án quá hạn',
                          'Dự án hoàn thành',
                          'Dự án ẩn',
                          'Dự án dừng',
                        ],
                        colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', '#20194d', 'black'],
                      }}
                      series={[
                        get(group.group, 'statistics.task_waiting', 0),
                        get(group.group, 'statistics.task_doing', 0),
                        get(group.group, 'statistics.task_expired', 0),
                        get(group.group, 'statistics.task_complete', 0),
                        get(group.group, 'statistics.task_hidden', 0),
                        get(group.group, 'statistics.task_stop', 0),
                      ]}
                      width={250}
                      height={250}
                    />
                    <ChartTitle>
                      Hoạt động
                    </ChartTitle>
                    {
                      get(group.group, 'statistics.task_waiting', 0) +
                      get(group.group, 'statistics.task_doing', 0) +
                      get(group.group, 'statistics.task_expired', 0) +
                      get(group.group, 'statistics.task_complete', 0) +
                      get(group.group, 'statistics.task_hidden', 0) +
                      get(group.group, 'statistics.task_stop', 0) === 0
                        ? <ChartPlacedolder />
                        : null
                    }
                  </ChartDrawer>
                  <ProjectGroupName>
                    Chưa phân loại
                  </ProjectGroupName>
                  <ChartInfoBox
                    data={
                      [{
                        color: '#ff9800',
                        title: 'Dự án đang chờ',
                        value: get(group.group, 'statistics.task_waiting', 0),
                      }, {
                        color: '#03a9f4',
                        title: 'Dự án đang làm',
                        value: get(group.group, 'statistics.task_doing', 0),
                      }, {
                        color: '#f44336',
                        title: 'Dự án quá hạn',
                        value: get(group.group, 'statistics.task_expired', 0),
                      }, {
                        color: '#03c30b',
                        title: 'Dự án hoàn thành',
                        value: get(group.group, 'statistics.task_complete', 0),
                      }, {
                        color: '#20194d',
                        title: 'Dự án ẩn',
                        value: get(group.group, 'statistics.task_hidden', 0),
                      }, {
                        color: '#000',
                        title: 'Dự án dừng',
                        value: get(group.group, 'statistics.task_stop', 0),
                      }]
                    }
                  />
                </ChartBox>
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Mô tả</ColorTypo>
                </SubHeader>
                <ColorTextField 
                  value={get(group.group, 'description', '')}
                />
              </SubContainer>
            </div>
          </Container>
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

export default DefaultGroupDetail;
