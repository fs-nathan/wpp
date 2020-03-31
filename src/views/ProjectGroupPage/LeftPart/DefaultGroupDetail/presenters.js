import { mdiChevronLeft } from '@mdi/js';
import { get } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import { Container, SubContainer } from '../../../../components/CustomDetailBox';
import { ChartBox, ChartDrawer, ChartInfoBox, ChartPlaceholder, ChartTitle, CustomChart } from '../../../../components/CustomDonutChart';
import CustomTextbox from '../../../../components/CustomTextbox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
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
                        ],
                        colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', '#20194d'],
                      }}
                      series={[
                        get(group.group, 'statistics.task_waiting', 0),
                        get(group.group, 'statistics.task_doing', 0),
                        get(group.group, 'statistics.task_expired', 0),
                        get(group.group, 'statistics.task_complete', 0),
                        get(group.group, 'statistics.task_hidden', 0),
                      ]}
                      width={200}
                      height={200}
                    />
                    <ChartTitle>
                      Hoạt động
                    </ChartTitle>
                    {
                      get(group.group, 'statistics.task_waiting', 0) +
                        get(group.group, 'statistics.task_doing', 0) +
                        get(group.group, 'statistics.task_expired', 0) +
                        get(group.group, 'statistics.task_complete', 0) +
                        get(group.group, 'statistics.task_hidden', 0) === 0
                        ? <ChartPlaceholder />
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
                <CustomTextbox
                  value={get(group.group, 'description', '')}
                  isReadOnly={true}
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
