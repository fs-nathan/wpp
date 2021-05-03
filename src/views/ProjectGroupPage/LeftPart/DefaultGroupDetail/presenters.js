import { mdiChevronLeft } from '@mdi/js';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import { Container, SubContainer } from '../../../../components/CustomDetailBox';
import { ChartBox, ChartDrawer, ChartInfoBox, ChartPlaceholder, ChartTitle, CustomChart } from '../../../../components/CustomDonutChart';
import CustomTextbox from '../../../../components/CustomTextbox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import { projectStatusColors } from 'constants/colors';
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
  group, route
}) {

  const history = useHistory();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LeftSideContainer
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(route),
          tooltip: t("DMH.VIEW.PGP.LEFT.INFO.BACK"),
        }}
        title={t("DMH.VIEW.PGP.LEFT.INFO.TITLE")}
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
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.WAITING"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.DOING"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.EXPIRED"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.COMPLETE"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.HIDDEN"),
                      ],
                      colors: projectColors.slice(0, 5),
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
                    {t("DMH.VIEW.PGP.LEFT.INFO.ACTV")}
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
                  {t("DMH.VIEW.PGP.LEFT.INFO.DEFAULT")}
                </ProjectGroupName>
                <ChartInfoBox
                  title={t("DMH.VIEW.PGP.LEFT.INFO.STATS.TOTAL")}
                  data={
                    [{
                      color: projectStatusColors.waiting,
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.WAITING"),
                      value: get(group.group, 'statistics.task_waiting', 0),
                    }, {
                      color: projectStatusColors.doing,
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.DOING"),
                      value: get(group.group, 'statistics.task_doing', 0),
                    }, {
                      color: projectStatusColors.complete,
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.COMPLETE"),
                      value: get(group.group, 'statistics.task_complete', 0),
                    }, {
                      color: projectStatusColors.expired,
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.EXPIRED"),
                      value: get(group.group, 'statistics.task_expired', 0),
                    }, {
                      color: projectStatusColors.hidden,
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.HIDDEN"),
                      value: get(group.group, 'statistics.task_hidden', 0),
                    }]
                  }
                />
              </ChartBox>
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("DMH.VIEW.PGP.LEFT.INFO.DESC")}</ColorTypo>
              </SubHeader>
              <CustomTextbox
                value={get(group.group, 'description', '')}
                isReadOnly={true}
              />
            </SubContainer>
          </div>
        </Container>
      </LeftSideContainer>
    </React.Fragment>
  )
}

export default DefaultGroupDetail;
