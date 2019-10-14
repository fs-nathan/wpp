import React from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import Icon from '@mdi/react';
import { mdiSquare } from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import ProgressBar from '../../../components/ProgressBar';
import AvatarCircleList from '../../../components/AvatarCircleList';

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
  padding: 15px;

`;

const Header = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ChartBox = styled.div`
  padding: 10px;
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
  padding: 10px 0;
  display: flex;
  align-items: center;
  & > span {
    flex-grow: 1;
    border: 1px solid rgba(0, 0, 0, .1);
    margin-left: 0.5rem;
  }
`;

const StartEndDateBox = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: auto;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const StartDateBox = styled.div`
  text-align: left;
`;

const EndDateBox = styled.div`
  text-align: right;
`;

function ListPart() {
  return (
    <Container>
      <Header>
        <ColorTypo uppercase bold>Thông tin dự án</ColorTypo>
      </Header>
      <ChartBox>
        <div>
          <Chart 
            type='donut'
            options={{
              title: {
                text: 'Hoạt động',
                align: 'center',
                offsetY: 110,
                style: {
                  color:  '#31b586',
                },
              },
              legend: {
                show: false,
              },
              plotOptions: {
                pie: {
                  expandOnClick: false,
                },
              },
              labels: ['Công việc đang chờ', 'Công việc đến hạn', 'Công việc quá hạn'],
            }}
            series={
              [20, 45, 35]
            }
            width={250}
            height={250}
          />
        </div>
        <ChartLegendBox>
          <Icon path={mdiSquare} size={1} color={'#2E93fA'} />
          <ColorTypo>Công việc đang chờ</ColorTypo>
          <ColorTypo>20</ColorTypo>
        </ChartLegendBox>
        <ChartLegendBox>
          <Icon path={mdiSquare} size={1} color={'#66DA26'} />
          <ColorTypo>Công việc đến hạn</ColorTypo>
          <ColorTypo>45</ColorTypo>
        </ChartLegendBox>
        <ChartLegendBox>
          <Icon path={mdiSquare} size={1} color={'#FF9800'} />
          <ColorTypo>Công việc quá hạn</ColorTypo>
          <ColorTypo>35</ColorTypo>
        </ChartLegendBox>
      </ChartBox>
      <SubHeader>
        <ColorTypo uppercase>Tiến độ dự án</ColorTypo>
        <span />
      </SubHeader>
      <StartEndDateBox>
        <StartDateBox>
          <ColorTypo>08:30</ColorTypo>
          <ColorTypo>10/06/2019</ColorTypo>
        </StartDateBox>
        <EndDateBox>
          <ColorTypo>08:30</ColorTypo>
          <ColorTypo>10/06/2019</ColorTypo>
        </EndDateBox>
      </StartEndDateBox>
      <ProgressBar percentDone={42} percentTarget={50} />
      <SubHeader>
        <ColorTypo uppercase>Mô tả dự án</ColorTypo>
        <span />
      </SubHeader>
      <ColorTypo>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, libero.
      </ColorTypo>
      <SubHeader>
        <ColorTypo uppercase>Thành viên</ColorTypo>
        <span />
      </SubHeader>
      <AvatarCircleList total={20} display={12}/>
    </Container>
  )
}

export default ListPart;
