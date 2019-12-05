import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';
// import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';
import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react'
import { Scrollbars } from 'react-custom-scrollbars'
import { WrapperContext } from '../../../index'
import { log } from 'util';
const Container = styled.div`
  padding: 10px 0 50px 0;

  & > *:not(last-child) {
    padding-top: 15px;
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

// const ProgressBar = styled(MultiSlider)`
//   border-radius: 5px !important;
//   margin-bottom: 100px !important;
//   & > *:first-child {
//     border-radius: 5px;
//     background-repeat: repeat!important;
//     background-size: 1rem 1rem!important;
//     border-bottom-right-radius: 0;
//     border-top-right-radius: 0;
//     background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)!important;
//     & > span {
//       border: 1px solid #AAA;
//       background-color: #a5a0a0;
//       border-radius: 1px;
//       width: 3px;
//       & > p {
//         position: absolute;
//         top: -30px;
//         color: red;
//         left: -7px;
//       }
//     }
//   }
// `
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

const InputProgressBar = styled.input`
  background-color: ;
  && {
    -webkit-appearance: none;
    -moz-apperance: none;
    border-radius: 6px;
    height: 11px;
    width: 400px;
    margin: auto;
    background-image: -webkit-gradient(linear,
        left top, 
        right top, 
        color-stop(${props => props.value}%, #2dc63a),
        color-stop(${props => props.value}%, #b0eab5));
    background-image: -moz-linear-gradient(left center,
        #2dc63a 0%, #2dc63a ${props => props.value}%,
        #b0eab5 ${props => props.value}%, #b0eab5 100%);
  }
  ::-moz-range-track {
    border: none;
    background: none;
    outline: none;
  }
  :focus {
    outline: none;
    border: none;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #2dc63a;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    -moz-appearance: none !important;
    background-color: #2dc63a;
    border: none;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    &&:hover {
      opacity: 1;
    }
`
const WrapperProgressBar = styled.div`
  margin: auto;
  & > div:nth-child(1) {
    width: 400px;
    margin: auto;
    padding-bottom: 14px;
  }
  & > div:nth-child(2) {
    width: 400px;
    margin: auto;
  }
`
const ContentProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2dc63a;
  border-radius: 50% 50% 50% 0;
  width: 35px;
  height: 35px;
  transform: rotate(-45deg);
  margin-left: calc(${props => props.value}% - 17.5px);
  & > div {
    color: #fff;
    transform: rotate(45deg);
  }
`
// const ProgressBarActive = (props) => {
//   const [progress, setStateProgress] = React.useState(10)

//   const handleProgress = () => {
//     setStateProgress(progress)
//   }
//   return (
//  <ProgressBar
//         width={370}
//         height={20}
//         slidableZoneSize={40}
//         backgroundColor="#edeff0"
//         equalColor="#3ac5aa"
//         style={{ margin: 'auto' }}
//         onSlide={handleProgress}
//         onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
//         onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
//         roundedCorners
//       >
//         <Progress height={20} color="green" progress={progress}>
//             <Dot>
//               <Typography> { !progress ? '0%' : `${progress}%` } </Typography>
//             </Dot>
//             <TextProgressToday component='div'>
//               <div />
//               <div />
//               <p >Hôm nay</p>
//               <span>70%</span>
//             </TextProgressToday>
//         </Progress>

//       </ProgressBar> 
//   )
// }



function TabBody() {

  const [dataProgress, setDataProgress] = React.useState(0)
  const value = React.useContext(WrapperContext)
  let listTime
  console.log("time......", value.listTime)
  if (value.listTime.trackings) {
    listTime = value.listTime.trackings.map((item, key) => {
      console.log("listTime.......", listTime)

      return (
        <TableRowItem key={key}>
          <CellAvatar>
            <Avatar style={{ width: 30, height: 30 }} src={item.user_create_avatar} alt='avatar' />
          </CellAvatar>
          <TableCell>
            Lần {key + 1}
            <RedTableCell>{item.time_create}</RedTableCell>
          </TableCell>
          <BlueTableCell>
            Bắt đầu: {item.new_start}
            <br />
            Kết thúc: {item.new_end}
          </BlueTableCell>
        </TableRowItem>
      )
    })
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
        {/* progress bar */}
        <WrapperProgressBar>
          <div>
            <ContentProgress value={dataProgress}>
              <div>{dataProgress}</div>
            </ContentProgress>
          </div>
          <div>
            <InputProgressBar
              type="range" min="1" max="100"
              value={dataProgress} onChange={e => setDataProgress(e.target.value)} />
          </div>
        </WrapperProgressBar>
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
            {listTime}
          </TableBody>
        </TableHistory>
      </Container>
    </Body>
  )
}

export default TabBody;
