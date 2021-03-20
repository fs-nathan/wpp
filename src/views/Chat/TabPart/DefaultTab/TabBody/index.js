import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updatePriority, getMember, focusTaskGroup } from '../../../../../actions/taskDetail/taskDetailActions';
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
import ConversationInfo from "./ConversationInfo"

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

function getStatusCode(status_code, complete) {
  if (complete === 100)
    return 2;
  if (status_code === 3)
    return 3;
  if (status_code === 4)
    return 4;
  if (complete === 0)
    return 0;
  return 1;
}

function TabBody(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const userId = useSelector(state => state.system.profile.id);
  const DEFAULT_TASK_STATISTIC = {
    progressCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    subTaskCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    remindCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    docCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    lctCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    offerCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    acceptOfferCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    commandCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    members: [],
    priority_code: 0,
    fileCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    imgCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    linkCnt: t('LABEL_CHAT_TASK_DANG_TAI')
  }
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
      progressCnt: duration_value ? `${duration_value} ${duration_unit}` : '',
      subTaskCnt: t('LABEL_CHAT_TASK_HOAN_THANH_COUNT_COMPLETE', { complete: total_subtask_complete, total: total_subtask }),
      remindCnt: t('LABEL_CHAT_TASK_NHAC_HEN_COUNT', { count: total_remind }),
      fileCnt: t('LABEL_CHAT_TASK_FILE_COUNT', { count: total_file }),
      imgCnt: t('LABEL_CHAT_TASK_ANH_COUNT', { count: total_img }),
      linkCnt: t('LABEL_CHAT_TASK_LINK_COUNT', { count: total_link }),
      lctCnt: t('LABEL_CHAT_TASK_VI_TRI_COUNT', { count: total_location }),
      offerCnt: t('LABEL_CHAT_TASK_DE_XUAT_COUNT', { count: total_offer }),
      acceptOfferCnt: t('LABEL_CHAT_TASK_DUYET_COUNT', { count: total_offer_approved }),
      commandCnt: t('LABEL_CHAT_TASK_NOI_DUNG_COUNT', { count: total_command }),
      complete, state_code,
      complete_with_time,
      members,
      priority_code
    })
  }, [detailTask, t])

  function onClickMember() {
    props.setShow(8)
    dispatch(getMember({ task_id: taskId }))
  }

  return (
    <div className="listPartTabBody">
      <Body
        renderView={props => <div {...props} className="listPartTabBody--container" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        <StyledList>
          <ConversationInfo type_chat={detailTask.person_chat_type} task_id={taskId} name={detailTask.name} members={detailTask.members ? (detailTask.person_chat_type == 1 ? detailTask.members.filter(m => m.id !== userId) : detailTask.members) : []} date_create={ t("LABEL_CREATED_AT", {created_at: detailTask.date_create})}/>
          <ListItemTab disableRipple button onClick={() => props.setShow(3)}>
            <ColorTypo>{t('LABEL_CHAT_TASK_NHAC_HEN')}</ColorTypo>
            <BadgeItem badge size='small' color='redlight' label={taskStatistic.remindCnt} />
          </ListItemTab>
          <ListItemTab disableRipple button onClick={() => props.setShow(4)}>
            <ColorTypo>{t('LABEL_CHAT_TASK_TAI_LIEU')}</ColorTypo>
            <BadgeItem badge size='small' color='purplelight' label={taskStatistic.imgCnt} style={{ marginRight: 5 }} />
            <BadgeItem badge size='small' color='purplelight' label={taskStatistic.fileCnt} style={{ marginRight: 5 }} />
            <BadgeItem badge size='small' color='purplelight' label={taskStatistic.linkCnt} />
          </ListItemTab>
          <ListItemTab disableRipple button onClick={() => props.setShow(5)}>
            <ColorTypo>{t('LABEL_CHAT_TASK_CHIA_SE_VI_TRI')}</ColorTypo>
            <BadgeItem badge size='small' color='indigolight' label={taskStatistic.lctCnt} />
          </ListItemTab>
          {
            detailTask.person_chat_type == 2 &&
            <ListItemTab disableRipple button onClick={onClickMember}>
              <ColorTypo>{t('LABEL_CHAT_TASK_THANH_VIEN')}</ColorTypo>
              <AvatarCircleList users={members} display={9} />
            </ListItemTab>
          }
        </StyledList>
      </Body >
    </div>
  )
}

export default TabBody;
