import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell, Slider } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import colorPal from '../../../../../helpers/colorPalette';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react'
import { Scrollbars } from 'react-custom-scrollbars'
import { WrapperContext } from '../../../index'

const Container = styled.div`
  padding: 10px 0 50px 20px;

  & > *:not(last-child) {
    padding-top: 40px;
    margin: 0 auto;
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
const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: '#2dc63a',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
const WrapperProgressBar = styled.div`
  & > *:first-child > span:nth-child(4) > span > span > span {
    color: #fff;
  }
`

function TabBody() {
  const classes = useStyles();
  const value = React.useContext(WrapperContext)

  let listTime

  if (value.listTime && value.listTime.trackings) {
    listTime = value.listTime.trackings.map((item, key) => {
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
  // function convertDate(convert_day){
  //   return convert_day.split('-').reverse().join('-');
  // }
  const updateComplete=(data)=>{
    let task_id=value.taskId
    let complete=parseFloat(data)
    value.updateComplete({task_id,complete})
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <Container>
        <StartEndDateBox>
          <StartDateBox>
            <ColorTypo>{value.detailTask && value.detailTask.start_time}</ColorTypo>
            <ColorTypo>{value.detailTask && value.detailTask.start_date}</ColorTypo>
          </StartDateBox>
          <EndDateBox>
            <ColorTypo>{value.detailTask && value.detailTask.end_time}</ColorTypo>
            <ColorTypo>{value.detailTask && value.detailTask.end_date}</ColorTypo>
          </EndDateBox>
        </StartEndDateBox>
        {/* progress bar */}
      
        <WrapperProgressBar className={classes.root}>
          <PrettoSlider 
          valueLabelDisplay="on" 
          aria-label="pretto slider" 
          defaultValue={0}
          onChangeCommitted={(e, val) => {
            updateComplete(val)
            console.log("GOI API voi value la: ", val)}}
          />
        </WrapperProgressBar>
        <LegendBox>
          <Icon path={mdiCircle} size={1} color={'#2dc63a'} />
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
