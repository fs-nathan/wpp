import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';

const Container = styled.div`
  padding: 10px 0;

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
  border-bottom-style: dashed;
  & > *:first-child {
    border-bottom-style: dashed;
  }
`

const TableRowItem = styled(TableRow)`
  border-bottom-style: dashed;
`

const ProgressBar = styled(MultiSlider)`
  border-radius: 5px !important;
  margin-bottom: 100px !important;
  & > *:first-child {
    z-index: 10;
    border-radius: 5px;
    background-repeat: repeat!important;
    background-size: 1rem 1rem!important;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)!important;
    & > span {
      z-index: 10;
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
const TextProgressToday = styled(Typography)`
  z-index: 1;
  width: 55px;
  position: absolute;
  top: 0;
  left: 300px
  & > div:nth-child(1) {
    height: 20px;
    width: 20px;
    background-color: orange;
    border-radius: 50%;
    margin-left: 13px;
    margin-bottom: 5px;
  }
  & > div:nth-child(2) {
    height: 29px;
    width: 0px;
    border-left: 1px solid;
    margin-left: 22px;
  }
  & > p:nth-child(3) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  & > span:nth-child(4) {
    margin: 14px;
    color: red;
  }

  
`


// const ProgressBarActive = (props) => {
//   const [progress, setStateProgress] = React.useState(10)

//   const handleProgress = () => {
//     setStateProgress(progress)
//   }
//   return (
//     <MultiSlider
//         width={300}
//         height={20}
//         slidableZoneSize={40}
//         backgroundColor="#edeff0"
//         equalColor="green"
//         style={{ marginBottom: 40 }}
//         onSlide={handleProgress}
//         onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
//         onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
//         roundedCorners
//     >
//         <Progress color="green" progress={progress}>
//           <Dot color="grey" />
//         </Progress>

//     </MultiSlider>
//   )
// }


function TabBody() {
  const [progress, setStateProgress] = React.useState('')

  const handleProgress = (progress) => {
    setStateProgress(progress)
  }
  return (
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
      {/* progress */}
      <ProgressBar
        width={500}
        height={20}
        slidableZoneSize={20}
        backgroundColor="#edeff0"
        equalColor="#3ac5aa"
        style={{ margin: 'auto' }}
        onSlide={handleProgress}
        onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
        onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
        roundedCorners
      >
        <Progress color="green" progress={progress}>
            <Dot>
              <Typography> { (progress === '') ? '0%' : `${progress}%` } </Typography>
            </Dot>
            <TextProgressToday component='div'>
              <div />
              <div />
              <p >Hôm nay</p>
              <span>70%</span>
            </TextProgressToday>
        </Progress>

      </ProgressBar>
      {/* progress end */}

      <hr />
      <TypoTitle bold variant='subtitle1' >Lịch sử điều chỉnh tiến độ</TypoTitle>
      <TableHistory style={{ marginLeft: 20, marginRight: 20, borderBottomStyle: "dashed" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Lần thứ</TableCell>
            <TableCell>Nội dung điều chỉnh</TableCell>
          </TableRow>
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
  )
}

export default TabBody;
