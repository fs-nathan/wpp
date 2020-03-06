import React from 'react';
import styled from 'styled-components';
import {
  List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch } from 'react-redux';

import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import colorPal from '../../../../../helpers/colorPalette';

import { isExpiredDate } from '../../../../../helpers/jobDetail/stringHelper';
import { updatePriority } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import Description from './Description';
import ModalStatus from './ModalStatus';
import DropdownButton from './DropdownButton';
import HtmlTooltip from './HtmlTooltip';

import './styles.scss';

const ListItemButtonGroup = styled(ListItem)`
  flex-wrap: wrap;  
  & > * > *:first-child {
    text-transform: none;
    }
  }
`;

const ListItemTab = styled(ListItem)`
  border-top: 1px solid #eee;
  && {
    padding: 20px;
  }
  &&:hover {
    background-color: rgb(242, 245, 250);
  }
  & > p {
    font-size: 15px;
    margin-right: 10px;
  }
  &:last-child { 
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
`;

const StyledList = styled(List)`
margin-bottom: 6px;
  & > * {
    padding: 20px;
    & > div {
      margin: 0;
    }
  }
`;

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important
`
const ContentText = styled(ColorTypo)`
  font-weight: 500;
  font-size: 15px;
`
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const DEFAULT_TASK_STATISTIC = {
  progressCnt: "Đang tải",
  subTaskCnt: "Đang tải",
  remindCnt: "Đang tải",
  docCnt: "Đang tải",
  lctCnt: "Đang tải",
  offerCnt: "Đang tải",
  acceptOfferCnt: "Đang tải",
  commandCnt: "Đang tải",
  members: [],
  priority_code: 0,
  fileCnt: "Đang tải",
  imgCnt: "Đang tải",
  linkCnt: "Đang tải"
}

const ButtonDropdown = styled(DropdownButton)`
  display: ${props =>
    props.show ? 'block' : 'none'
  }
`

function TabBody(props) {
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);

  // console.log("Props::::", value.detailTask)
  const [taskStatistic, setTaskStatistic] = React.useState(DEFAULT_TASK_STATISTIC)
  let content = ""
  let data = ""
  // let dataComplete = ""
  if (detailTask) {
    content = detailTask.description || ""
    data = detailTask
    // dataComplete = value.listTaskDetail.tasks
  }
  React.useEffect(() => {
    if (!detailTask) return
    const {
      total_subtask_complete, total_subtask, total_location,
      total_remind, total_file, total_img, total_link, priority_code,
      total_offer, total_offer_approved, total_command, members,
      complete,
      complete_with_time = 0,
      duration_value, duration_unit
    } = detailTask
    setTaskStatistic({
      progressCnt: duration_value + " " + duration_unit,
      subTaskCnt: total_subtask_complete + '/' + total_subtask + ' hoàn thành',
      remindCnt: total_remind + ' nhắc hẹn',
      fileCnt: total_file + ' file', imgCnt: total_img + ' ảnh', linkCnt: total_link + ' link',
      lctCnt: total_location + ' vị trí',
      offerCnt: total_offer + ' đề xuất', acceptOfferCnt: total_offer_approved + ' duyệt',
      commandCnt: total_command + ' nội dung',
      complete,
      complete_with_time,
      members,
      priority_code
    })
  }, [detailTask])

  function onChangeItem(idx) {
    dispatch(updatePriority({ task_id: taskId, priority: idx }))
  }

  return (
    <Body className="listPartTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}>
      <StyledList>
        <ListItem>
          <ListItemText>
            <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>
              Tên công việc
           </ColorTypo>
            <ContentText component='span'>
              {detailTask && detailTask.name}
              {/* <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)', margin: '-4px', marginLeft: '5px' }} path={mdiPin} size={0.8} /> */}
            </ContentText>
          </ListItemText>
        </ListItem>
        <Description value={content} />
        <ListItemButtonGroup>
          {isExpiredDate(data.end_date)
            &&
            props.isPause
            ?
            <HtmlTooltip title={<ModalStatus values="Đang tạm dừng" />} placement="top-start">
              <div>
                <ColorButton size='small' variant='outlined'
                  style={{
                    marginBottom: '10px',
                    marginRight: '15px',
                    color: '#dc3545',
                    borderColor: '#dc3545',
                  }}>
                  Đang tạm dừng
                </ColorButton>
              </div>
            </HtmlTooltip>
            :
            <>
              <ButtonDropdown
                size='small' selectedIndex={0}
                values={['Đang làm', 'Đang chờ', 'Hoàn thành']}
                handleChangeItem={() => { }}
                show={isExpiredDate(data.end_date)}
              />
              <ButtonDropdown
                size='small'
                values={['Ưu tiên cao', 'Ưu tiên trung bình', 'Ưu tiên thấp']}
                selectedIndex={taskStatistic.priority_code}
                handleChangeItem={onChangeItem}
                show={isExpiredDate(data.end_date)}
              />
            </>
          }
          {
            !isExpiredDate(data.end_date)
            &&
            <Typography
              className="listPartTabBody--expired"
            >
              Đã quá hạn
              </Typography>
          }
        </ListItemButtonGroup>
        <ListItemTab disableRipple button onClick={() => props.setShow(1)}>
          <ColorTypo>Tiến độ</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.progressCnt} style={{ marginRight: 10 }} />
          <div className="simple-progress-bar-wrapper">
            <SimpleSmallProgressBar percentDone={taskStatistic.complete} percentTarget={taskStatistic.complete_with_time} color={colorPal['teal'][0]} targetColor={colorPal['orange'][0]} />
          </div>
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(2)}>
          <ColorTypo>Công việc con</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={taskStatistic.subTaskCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(3)}>
          <ColorTypo>Nhắc hẹn</ColorTypo>
          <BadgeItem badge size='small' color='redlight' label={taskStatistic.remindCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(4)}>
          <ColorTypo>Tài liệu</ColorTypo>
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.fileCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.imgCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.linkCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(5)}>
          <ColorTypo>Chia sẻ vị trí</ColorTypo>
          <BadgeItem badge size='small' color='indigolight' label={taskStatistic.lctCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(6)}>
          <ColorTypo>Đề xuất, duyệt</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.offerCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.acceptOfferCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(7)}>
          <ColorTypo>Chỉ đạo, quyết định</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={taskStatistic.commandCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(8)}>
          <ColorTypo>Thành viên</ColorTypo>
          <AvatarCircleList total={taskStatistic.members.length} display={6} />
          {/* {MemberTask(taskStatistic)} */}
        </ListItemTab>
      </StyledList>
    </Body >
  )
}

export default TabBody;
