import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiCheckCircle, mdiCheckboxBlankCircleOutline,
  // mdiPin, 
  mdiClockAlert
} from '@mdi/js';
import {
  List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { EditorState, convertFromRaw, ContentState } from 'draft-js';

import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import colorPal from '../../../../../helpers/colorPalette';
import { isLongerContent, getCollapseText } from '../../../../../helpers/jobDetail/stringHelper'
import Tooltip from '@material-ui/core/Tooltip';

import { isExpiredDate } from '../../../../../helpers/jobDetail/stringHelper'
import { useSelector, useDispatch } from 'react-redux';
import { updatePriority } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import TextEditor from '../../../../../components/TextEditor';

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

const ListItemTabPart = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: start;
`

function DropdownButton({ values, handleChangeItem, selectedIndex }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selected, setSelected] = React.useState(0)
  const [hideTooltip, setHideTooltip] = React.useState(false)

  React.useEffect(() => {
    if (values[selectedIndex]) setSelected(selectedIndex)
  }, [selectedIndex, values])

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
    setHideTooltip(true)
  }

  function handleClose() {
    setAnchorEl(null)
    setHideTooltip(false)
  }

  function handleSelect(index) {
    setSelected(index)
    handleChangeItem(index)
    handleClose()
  }

  if (values.length === 0) return (
    <ColorButton variantColor='teal' size='small' aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
    // endIcon={
    //   <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
    // }
    />
  );
  else return (
    <React.Fragment>
      <HtmlTooltip
        disableFocusListener={hideTooltip}
        title={<ModalStatus values={values[selected]} />}
        placement="top-start">
        <div>
          <ColorButton
            variantColor='teal' size='small' onClick={handleClick}
            aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}>
            {values[selected]}
          </ColorButton>
        </div>
      </HtmlTooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 130,
          horizontal: 0,
        }}
      >
        {
          values.map((value, index) => {
            return (
              <MenuItem key={index} onClick={() => handleSelect(index)}>
                {index === selected ? (
                  <ListItemIcon >
                    <Icon path={mdiCheckCircle} size={1} color={colorPal['green'][0]} />
                  </ListItemIcon>

                ) : (
                    <ListItemIcon>
                      <Icon path={mdiCheckboxBlankCircleOutline} size={1} color={colorPal['default'][0]} />
                    </ListItemIcon>
                  )}
                <ListItemText >
                  {value}
                </ListItemText>
                <Divider />
              </MenuItem>
            );
          })
        }
      </Menu>
    </React.Fragment>
  );
}

const getEditorData = (value) => {
  try {
    const raw = JSON.parse(value);
    const data = EditorState.createWithContent(convertFromRaw(raw));
    return data;
  } catch (e) {
    try {
      const data = EditorState.createWithContent(ContentState.createFromText(value));
      return data;
    } catch (e) {
      return EditorState.createEmpty();
    }
  }
}

function Content({ value }) {
  const [isOpen, setOpen] = React.useState(false)
  const handlePressViewButton = () => {
    setOpen(!isOpen)
  }
  return (
    <ListItemTabPart>
      {
        !isLongerContent(value)
          ? <ListItemText
            primary={
              <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
            }
            secondary={
              <TextEditor isReadOnly
                value={getEditorData(value)}
              >
              </TextEditor>
              // <ColorTypo component='span' style={{ fontSize: 15 }}>{value}</ColorTypo>
            }
          />
          :
          <>
            <ListItemText
              primary={
                <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
              }
              secondary={
                // <ColorTypo component='span' style={{ fontSize: 15 }}>
                //   {isOpen ? value : getCollapseText(value)}
                // </ColorTypo>
                <TextEditor isReadOnly
                  value={getEditorData(value)}
                >
                </TextEditor>
              }

            />
            {isOpen
              ? <div className="button-text" onClick={handlePressViewButton}>Thu gọn</div>
              : <div className="button-text" onClick={handlePressViewButton}>Xem thêm</div>
            }
          </>
      }
    </ListItemTabPart>
  )
}

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

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fff',
    maxWidth: 210,
    height: 110,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const ModalStatus = (status) => {

  let value = '', color, icon
  switch (status.values) {
    case "Đang làm":
      value = "Đang làm";
      break;
    case "Đang chờ":
      value = "Đang chờ";
      break;
    case "Hoàn thành":
      value = "Hoàn thành";
      break;
    case "Ưu tiên cao":
      value = "Ưu tiên cao";
      break;
    case "Ưu tiên trung bình":
      value = "Ưu tiên trung bình";
      break;
    case "Ưu tiên thấp":
      value = "Ưu tiên thấp";
      break;
    case "Đang tạm dừng":
      value = "Đang tạm dừng";
      color = '#dc3545';
      icon = mdiClockAlert;
      break;
    default:
      value = "Đang tải"
  }
  return (
    <React.Fragment>
      <div className="styled-context-status">
        <div>
          <Icon path={icon ? icon : mdiCheckCircle} size={1} color={icon ? '#dc3545' : '#03b000'} />
          <p>Trạng thái:</p>
          <p style={{ color: color }}>{value}</p>
        </div>
        <p>
          {(value === "Đang làm" || value === "Đang chờ" || value === "Hoàn thành")
            ?
            'Hãy cập nhập tiến độ hoàn thành để thay đổi trạng thái công việc'
            :
            (value === "Ưu tiên cao" || value === "Ưu tiên trung bình" || value === "Ưu tiên thấp")
              ?
              'Mức độ ưu tiên phản ánh tính chất khẩn cấp công việc'
              :
              'Admin đã tạm dừng công việc, vào cài đặt công việc để thay đổi trạng thái'
          }
        </p>
      </div>
    </React.Fragment>
  )
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
      members,
      priority_code
    })
  }, [detailTask])

  function onChangeItem(idx) {
    dispatch(updatePriority({ task_id: taskId, priority: idx }))
  }

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
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
        <Content value={content} />
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
            <ColorButton
              size='small' variant='contained' variantColor='red'
              style={{
                marginBottom: '10px',
                boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.1)'
              }}>
              Đã quá hạn
              </ColorButton>
          }
        </ListItemButtonGroup>
        <ListItemTab disableRipple button onClick={() => props.setShow(1)}>
          <ColorTypo>Tiến độ</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={taskStatistic.progressCnt} style={{ marginRight: 10 }} />
          <div className="simple-progress-bar-wrapper">
            <SimpleSmallProgressBar percentDone={28} percentTarget={70} color={colorPal['teal'][0]} targetColor={colorPal['orange'][0]} />
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
