import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell, Slider } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import colorPal from '../../../../../helpers/colorPalette';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector, useDispatch } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { updateComplete } from '../../../../../actions/taskDetail/taskDetailActions';

const BlueTableCell = styled(TableCell)`
  color: ${colorPal['blue'][0]};
`;

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
const UserAvatar = styled(Avatar)`
    width: 30px;
    height: 30px;
  `

const TableRowItem = styled(TableRow)`
  border-bottom: 1px dashed grey;
  & > th, td {
    border-bottom: none;
  }
`

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
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const listTime = useSelector(state => state.taskDetail.trackingTime.listTime);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  let listTimeRender = null;

  if (listTime && listTime.trackings) {
    listTimeRender = listTime.trackings.map((item, key) => {
      return (
        <TableRowItem key={key}>
          <CellAvatar>
            <UserAvatar src={item.user_create_avatar} alt='avatar' />
          </CellAvatar>
          <TableCell>
            Lần {key + 1}
            <p className="red-table-cell">{item.time_create}</p>
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

  const onChangeCommitted = (data) => {
    let task_id = taskId
    let complete = parseFloat(data);
    dispatch(updateComplete({ data: { task_id, complete }, projectId: projectId }));
  }

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-progress-tabbody">
        <div className="start-end-date-box">
          <div className="start-date-box">
            <ColorTypo>{detailTask && detailTask.start_time}</ColorTypo>
            <ColorTypo>{detailTask && detailTask.start_date}</ColorTypo>
          </div>
          <div className="end-date-box">
            <ColorTypo>{detailTask && detailTask.end_time}</ColorTypo>
            <ColorTypo>{detailTask && detailTask.end_date}</ColorTypo>
          </div>
        </div>
        {/* progress bar */}

        <WrapperProgressBar className={classes.root}>
          <PrettoSlider
            valueLabelDisplay="on"
            aria-label="pretto slider"
            defaultValue={0}
            onChangeCommitted={(e, val) => {
              onChangeCommitted(val)
              // console.log("GOI API voi value la: ", val)
            }}
          />
        </WrapperProgressBar>
        <div className="legend-box">
          <Icon path={mdiCircle} size={1} color={'#2dc63a'} />
          <ColorTypo>Hoàn thành thực tế</ColorTypo>
        </div>
        <div className="legend-box">
          <Icon path={mdiCircle} size={1} color={'#ff9800'} />
          <ColorTypo>Kế hoạch</ColorTypo>
        </div>
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
            {listTimeRender}
          </TableBody>
        </TableHistory>
      </div>
    </Body>
  )
}

export default TabBody;
