import {
  Box,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Popover,
  Radio,
  Typography
} from '@material-ui/core';
import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
  focusTaskGroup,
  getMember,
  stopTask,
  updateTaskStatus
} from '../../../../../actions/taskDetail/taskDetailActions';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import ColorChip from '../../../../../components/ColorChip';
import ColorTypo from '../../../../../components/ColorTypo';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import colorPal from '../../../../../helpers/colorPalette';
import {taskIdSelector} from '../../../selectors';
import Description from './Description';
import HtmlTooltip from './HtmlTooltip';
import ModalPriority from './ModalPriority';
import StatusLabel, {statusLabel, TYPE_PRIORITY, TYPE_STATUS} from './StatusLabel';
import './styles.scss';
import {get} from "lodash";

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
  margin-bottom: 0px;
  & > * {
    & > div {
      margin: 0;
    }
  }
`;

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important;
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

function TabBody(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const members = useSelector(state => state.taskDetail.taskMember.member);
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
    linkCnt: t('LABEL_CHAT_TASK_DANG_TAI'),
    status_label: {}
  }

  const [taskStatistic, setTaskStatistic] = React.useState(DEFAULT_TASK_STATISTIC);
  const taskStatus = [
    {value: 0, label: statusLabel[0], des: "LABEL_PROCESS_PERCENT_WAITING"},
    {value: 1, label: statusLabel[1], des: "LABEL_PROCESS_PERCENT_DOING"},
    {value: 2, label: statusLabel[2], des: "LABEL_PROCESS_PERCENT_COMPLETED"},
    {value: 4, label: statusLabel[4], des: "LABEL_PROCESS_PERCENT_PAUSED"},
  ];
  const [isRequesting, setIsRequesting] = React.useState(false)

  let content = ""
  let data = ""

  if (detailTask) {
    content = detailTask.description || ""
    data = detailTask
  }
  React.useEffect(() => {
    if (!detailTask) return
    const {
      total_subtask_complete, total_subtask, total_location,
      total_remind, total_file, total_img, total_link, priority_code,
      total_offer, total_offer_approved, total_command, members,
      complete, state_code,
      complete_with_time = 0,
      duration_value, duration_unit, status_label
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
      priority_code,
      status_label: status_label
    })
    setIsRequesting(false)
  }, [detailTask, t])

  function onClickMember() {
    props.setShow(8)
    // dispatch(getMember({ task_id: taskId, group_by_role: true }))
  }

  function onClickGroupTask() {
    dispatch(focusTaskGroup(detailTask.group_task))
  }
  const [tooltipChangeTaskStatus, setTooltipChangeTaskStatus] = React.useState(null);

  function handleUpdateTaskStatus(status) {
    setTooltipChangeTaskStatus(null);
    setIsRequesting(true)
    if(status === 4) {
      dispatch(stopTask(taskId));
    } else {
      dispatch(updateTaskStatus({task_id: taskId, status}));
    }
  }

  return (
    <div className="listPartTabBody">
      <Body
        renderView={props => <div {...props} className="listPartTabBody--container" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        <StyledList>
          <ListItem>
            <ListItemText>
              <ColorTypo className="listPartTabBody--title">{t('LABEL_CHAT_TASK_TEN_CONG_VIEC')}</ColorTypo>
              <ContentText component='span'>
                {detailTask && detailTask.name}
              </ContentText>
            </ListItemText>
          </ListItem>
          <Description value={content} />
          <ListItem onClick={onClickGroupTask} className="listPartTabBody--groupTask">
            <ListItemText>
              <ColorTypo className="listPartTabBody--title">{t('LABEL_CHAT_TASK_NHOM_VIEC')}</ColorTypo>
              <div className="Description--content">
                {detailTask && detailTask.group_task_name}
              </div>
            </ListItemText>
          </ListItem>
          <ListItemButtonGroup>
            <StatusLabel
              type={TYPE_STATUS}
              value={taskStatistic.state_code}
              hasIcon={true}
              onClick={(evt) => setTooltipChangeTaskStatus(evt.currentTarget)}
            />
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
              get(taskStatistic, "status_label.type") === "Expired" &&
              <Typography
                className="listPartTabBody--expired"
              >{t('LABEL_CHAT_TASK_DA_QUA_HAN')}</Typography>
            }
            {
              get(taskStatistic, "status_label.type") === "Stop" &&
              <Typography
                className="listPartTabBody--stop"
              >{t('LABEL_CHAT_TASK_TAM_DUNG')}</Typography>
            }
          </ListItemButtonGroup>
          <ListItemTab disableRipple button onClick={() => props.setShow(1)}>
            <ColorTypo>{t('LABEL_CHAT_TASK_TIEN_DO')}</ColorTypo>
            {taskStatistic.progressCnt &&
              <BadgeItem badge color='orangelight'
                label={taskStatistic.progressCnt}
                className="listPartTabBody--badge"
              />}
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
            <BadgeItem badge size='small' color='purplelight' label={taskStatistic.imgCnt} style={{ marginRight: 5 }} />
            <BadgeItem badge size='small' color='purplelight' label={taskStatistic.fileCnt} style={{ marginRight: 5 }} />
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
          <ListItemTab disableRipple button onClick={onClickMember}>
            <ColorTypo>{t('LABEL_CHAT_TASK_THANH_VIEN')}</ColorTypo>
            <AvatarCircleList users={members} display={9} />
          </ListItemTab>
        </StyledList>
      </Body >
      <Popover
        anchorEl={tooltipChangeTaskStatus}
        open={Boolean(tooltipChangeTaskStatus)}
        onClose={() => setTooltipChangeTaskStatus(null)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{vertical: -10, horizontal: 'left'}}
        className={"toolTipUpdateStatus"}
      >
        <Box className={"toolTipUpdateStatus-header"}>
          <Typography variant={"h6"}>{t("LABEL_UPDATE_TASK_STATUS")}</Typography>
        </Box>
        <Divider/>
        <Box className={"toolTipUpdateStatus-body"}>
          {taskStatus.map(function (item, index) {
            return (
              <>
                {index === 3 && (<Divider style={{marginTop: 10}}/>)}
                <Box className={"toolTipUpdateStatus-item"} onClick={(e) => {
                  if (isRequesting) return false;
                  if(taskStatistic.complete !== 100 && taskStatistic.state_code !== item.value) handleUpdateTaskStatus(item.value);
                }}>
                  <div className={"toolTipUpdateStatus-itemHeader"}>
                    <FormControlLabel
                      value={item.value} disabled={taskStatistic.complete === 100 || taskStatistic.state_code === item.value}
                      control={<Radio />}
                      label={t(item.label)}
                      checked={taskStatistic.state_code === item.value}
                      onChange={() => null} onClick={() => null}
                    />
                  </div>
                  <div className={`toolTipUpdateStatus-itemBody ${(taskStatistic.complete === 100 || taskStatistic.state_code === item.value) ? "radioDisabled" : ""}`}>
                    <Typography variant={"body1"} color={"textSecondary"}>
                      {t(item.des)}
                    </Typography>
                  </div>
                </Box>
              </>
            );
          })}
        </Box>
      </Popover>
    </div>
  )
}

export default TabBody;
