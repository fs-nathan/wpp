import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updatePriority } from '../../../../../actions/taskDetail/taskDetailActions';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import ColorChip from '../../../../../components/ColorChip';
import ColorTypo from '../../../../../components/ColorTypo';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import colorPal from '../../../../../helpers/colorPalette';
import { isExpiredDate } from '../../../../../helpers/jobDetail/stringHelper';
import { taskIdSelector } from '../../../selectors';
import Description from './Description';
import HtmlTooltip from './HtmlTooltip';
import ModalPriority from './ModalPriority';
import ModalStatus from './ModalStatus';
import StatusLabel, { TYPE_PRIORITY, TYPE_STATUS } from './StatusLabel';
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
    & > div {
      margin: 0;
    }
  }
`;

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important
  & > span {
    font-size: 12px;
    padding: 0 5px;
    border-radius: 2px;
  }
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

function getCompleteStatus(complete) {
  if (complete === 100)
    return 2
  if (complete === 0)
    return 0
  return 1
}

function TabBody(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const members = useSelector(state => state.taskDetail.taskMember.member);

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
      complete, state_code,
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
      complete, state_code,
      complete_with_time,
      members,
      priority_code
    })
  }, [detailTask])

  function onChangeItem(idx) {
    dispatch(updatePriority({ task_id: taskId, priority: idx }))
  }

  return (
    <Body className="listPartTabBody"
      renderView={props => <div {...props} className="listPartTabBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <StyledList>
        <ListItem>
          <ListItemText>
            <ColorTypo className="listPartTabBody--title">{t('LABEL_CHAT_TASK_TEN_CONG_VIEC')}</ColorTypo>
            <ContentText component='span'>
              {detailTask && detailTask.name}
              {/* <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)', margin: '-4px', marginLeft: '5px' }} path={mdiPin} size={0.8} /> */}
            </ContentText>
          </ListItemText>
        </ListItem>
        <Description value={content} />
        <ListItemButtonGroup>
          <HtmlTooltip classes={{ tooltip: "listPartTabBody--tooltip" }}
            TransitionProps={{ timeout: 0 }}
            title={<ModalStatus value={taskStatistic.state_code} />}
            placement="top-start">
            <StatusLabel
              type={TYPE_STATUS}
              value={getCompleteStatus(taskStatistic.complete)}
            />
          </HtmlTooltip>
          <HtmlTooltip classes={{ tooltip: "listPartTabBody--tooltip" }}
            TransitionProps={{ timeout: 0 }}
            title={<ModalPriority value={taskStatistic.priority_code} />}
            placement="top-start">
            <StatusLabel
              type={TYPE_PRIORITY}
              value={taskStatistic.priority_code}
            />
          </HtmlTooltip>
          {
            !isExpiredDate(data.end_date)
            &&
            <Typography
              className="listPartTabBody--expired"
            >{t('LABEL_CHAT_TASK_DA_QUA_HAN')}</Typography>
          }
        </ListItemButtonGroup>
        <ListItemTab disableRipple button onClick={() => props.setShow(1)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_TIEN_DO')}</ColorTypo>
          <BadgeItem badge color='orangelight' label={taskStatistic.progressCnt} className="listPartTabBody--badge" />
          <div className="simple-progress-bar-wrapper">
            <SimpleSmallProgressBar percentDone={taskStatistic.complete} percentTarget={taskStatistic.complete_with_time} color={colorPal['teal'][0]} targetColor={colorPal['orange'][0]} />
          </div>
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(2)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_CONG_VIEC_CON')}</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={taskStatistic.subTaskCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(3)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_NHAC_HEN')}</ColorTypo>
          <BadgeItem badge size='small' color='redlight' label={taskStatistic.remindCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(4)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_TAI_LIEU')}</ColorTypo>
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.fileCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.imgCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={taskStatistic.linkCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(5)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_CHIA_SE_VI_TRI')}</ColorTypo>
          <BadgeItem badge size='small' color='indigolight' label={taskStatistic.lctCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(6)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_DE_XUAT_DUYET')}</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.offerCnt} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.acceptOfferCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(7)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_CHI_DAO_QUYET_DINH')}</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={taskStatistic.commandCnt} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(8)}>
          <ColorTypo>{t('LABEL_CHAT_TASK_THANH_VIEN')}</ColorTypo>
          <AvatarCircleList users={members} display={9} />
          {/* {MemberTask(taskStatistic)} */}
        </ListItemTab>
      </StyledList>
    </Body >
  )
}

export default TabBody;
