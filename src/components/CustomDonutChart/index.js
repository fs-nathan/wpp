import styled from 'styled-components';
import Chart from 'react-apexcharts';

export const ChartBox = styled.div`
  padding: 10px 0;
  margin-top: 20px;
`;

export const ChartDrawer = styled.div`
  position: relative;
  height: 200px;
`;

export const ChartTitle = styled.span`
  position: absolute;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -50%);
  height: 90px;
  width: 90px;
  border-radius: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const ChartLegendBox = styled.div`
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

export const CustomChart = styled(Chart)`
  display: flex;
  justify-content: center;
  align-items: center;
`;