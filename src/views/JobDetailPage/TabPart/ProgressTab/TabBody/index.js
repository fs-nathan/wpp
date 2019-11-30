import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';
import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react'
import { Scrollbars } from 'react-custom-scrollbars'

const Container = styled.div`
  padding: 10px 0 50px 0;

  & > *:not(last-child) {
    margin-top: 30px;
  }
  & > hr {
    border-color: rgba(0, 0, 0, .1);
  }
`;

const StartEndDateBox = styled.div`
  padding: 8px 0 0 0;
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
  margin-left: 20px;
`;

const EndDateBox = styled.div`
  text-align: right;
  margin-right: 20px;
`;

const BlueTableCell = styled(TableCell)`
  color: ${colorPal['blue'][0]};
`;

const RedTableCell = styled.p`
  color: ${colorPal['red'][0]}
  padding: 0;
  margin: 0;
  border: 0;
  font-size: 11px
`
const CellAvatar = styled(TableCell)`
  padding-left: 0;
`

const TypoTitle = styled(ColorTypo)`
  color: ${colorPal['gray'][0]};
  margin-left: 20px;
`
// const Progress  = styled(ProgressBar)`
//   margin: 0 20px 85px 20px;
// `
const TableHistory = styled(Table)`
  margin-left: 20px;
  & > *:first-child {
    
  }
`

const TableRowItem = styled(TableRow)`
  border-bottom: 1px dashed grey;
  & > th, td {
    border-bottom: none;
  }
`

const ProgressBar = styled(MultiSlider)`
  border-radius: 5px !important;
  & > *:first-child {
    border-radius: 5px;
    & > span {
      border: 1px solid #AAA;
      background-color: #a5a0a0;
      border-radius: 1px;
      width: 3px;
      & > p {
        position: absolute;
        top: -30px;
        color: red;
        left: -7px;
      }
    }
  }
`
// const TextProgressToday = styled(Typography)`
//   z-index: 1;
//   width: 55px;
//   position: absolute;
//   top: 0;
//   left: 300px
//   & > div:nth-child(1) {
//     height: 20px;
//     width: 20px;
//     background-color: orange;
//     border-radius: 50%;
//     margin-left: 13px;
//     margin-bottom: 5px;
//   }
//   & > div:nth-child(2) {
//     height: 29px;
//     width: 0px;
//     border-left: 1px solid;
//     margin-left: 22px;
//   }
//   & > p:nth-child(3) {
//     margin-top: 5px;
//     margin-bottom: 5px;
//   }
//   & > span:nth-child(4) {
//     margin: 14px;
//     color: red;
//   }
  
// `
const LegendBox = styled.div`
  margin: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > *:first-child {
    margin-right: 10px;
  }
`;
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;


function TabBody() {
  const [progress, setStateProgress] = React.useState(0)

  const handleProgress = (progress) => {
    setStateProgress(progress)
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
    <Container>
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
      <ProgressBar
        width={370}
        height={14}
        slidableZoneSize={20}
        backgroundColor="#edeff0"
        equalColor="#3ac5aa"
        style={{ margin: 'auto' }}
        onSlide={handleProgress}
        onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
        onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
        roundedCorners
      >
        <Progress height={10} color="green" progress={progress}>
            <Dot>
              <Typography> { !progress ? '0%' : `${progress}%` } </Typography>
            </Dot>
            {/* <TextProgressToday component='div'>
              <div />
              <div />
              <p >Hôm nay</p>
              <span>70%</span>
            </TextProgressToday> */}
        </Progress>
        
      </ProgressBar>
      <LegendBox>
        <Icon path={mdiCircle} size={1} color={'rgb(49, 181, 134)'} />
        <ColorTypo>Hoàn thành thực tế</ColorTypo>
      </LegendBox>
      <LegendBox>
        <Icon path={mdiCircle} size={1} color={'#ff9800'} />
        <ColorTypo>Kế hoạch</ColorTypo>
      </LegendBox>
      {/* progress end */}
      <TypoTitle bold variant='subtitle1' >Lịch sử điều chỉnh tiến độ</TypoTitle>
      <TableHistory style={{ marginLeft: 20, marginRight: 20 }}>
        <TableHead>
          <TableRowItem>
            <TableCell></TableCell>
            <TableCell>Lần thứ</TableCell>
            <TableCell>Nội dung điều chỉnh</TableCell>
          </TableRowItem>
        </TableHead>
        <TableBody>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 1
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
              <br />
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRowItem>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 2
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
            </BlueTableCell>
          </TableRowItem>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 3
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRowItem>
        </TableBody>
      </TableHistory>
    </Container>
    </Body>
  )
}

export default TabBody;
