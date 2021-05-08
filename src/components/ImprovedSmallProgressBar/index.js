import { forEach, get, map, reduce } from 'lodash';
import React from 'react';
import styled from 'styled-components';

const Container = styled(({ color, ...rest }) => <div {...rest} />)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    color: ${props => props.color};
    font-size: 11px;
  }
`;

const BackBar = styled.div`
  position: relative;
  width: 90px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const FrontBar = styled(({ width, left, color, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  left: ${props => props.left}%;
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
`;

function ImprovedSmallProgressBar({ color, percentDone, data }) {

  const [barsData, setBarsData] = React.useState({});
  React.useEffect(() => {
    const total = reduce(data, (sum, info) => sum += get(info, 'value', 0), 0);
    if (total === 0) {
      setBarsData({
        total,
        widths: [],
        lefts: [],
        colors: [],
      });
    } else {
      const colors = map(data, info => get(info, 'color', '#000'));
      const widths = map(data, info => get(info, 'value', 0) / total * 100);
      let lefts = [];
      let curLeft = 0;
      forEach(widths, w => {
        lefts = [...lefts, curLeft];
        curLeft += w;
      });
      setBarsData({
        total,
        widths,
        lefts,
        colors,
      });
    }
  }, [data])

  return (
    <Container color={color}>
      <span style={{ minWidth: "20px" }}>{barsData.total}</span>
      <BackBar>
        {map(
          barsData.widths,
          (width, index) =>
            <FrontBar
              key={index}
              width={width}
              color={barsData.colors[index]}
              left={barsData.lefts[index]}
            />
        )}
      </BackBar>
      <span style={{ minWidth: "30px" }}>{percentDone}%</span>
    </Container>
  )
}

export default ImprovedSmallProgressBar;