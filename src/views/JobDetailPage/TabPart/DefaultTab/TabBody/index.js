import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiArrowRightBoldCircle, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiChevronRight, mdiPin } from '@mdi/js';
import { List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import Divider from '@material-ui/core/Divider';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import colorPal from '../../../../../helpers/colorPalette';
import {
  isLongerContent, getCollapseText
} from '../../../../../helpers/jobDetail/stringHelper'
import { WrapperContext } from '../../../index'

const ListItemButtonGroup = styled(ListItem)`
  flex-wrap: wrap;  
  & > * {
    text-transform: none;
    margin-right: 5px;
    margin-bottom: 3px;
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
margin-bottom: 20px;
  & > * {
    padding: 20px;
    & > div {
      margin: 0;
    }
  }
`;

const SimpleSmallProgressBarWrapper = styled.div`
  width: 150px;
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
const ButtonText = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  color: #a6a6a6;
  cursor: pointer;
  padding-top: 10px;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`
const ListItemTabPart = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: start;
`
function DropdownButton({ values, value, priority }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(0);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelect(index) {
    setSelected(index);
    if (priority === true) {
      console.log('index::::::::::', index)
      console.log('values::::::::::', values)
      console.log('value in select function::::', value)
      console.log('taskId::::', value.taskId)
      value.updateTaskPriority(value.taskId, index)
    }
    handleClose();
  }

  if (values.length === 0) return (
    <ColorButton variantColor='teal' size='small' aria-controls="simple-menu" aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
    // endIcon={
    //   <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
    // }
    />
  );
  else return (
    <React.Fragment>
      <ColorButton variantColor='teal' size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
      // endIcon={
      //   <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
      // }
      >
        {values[selected]}
      </ColorButton>
      <Menu
        id="simple-menu"
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
              <ColorTypo component='span' style={{ fontSize: 15 }}>{value}</ColorTypo>
            }
          />
          :
          <>
            <ListItemText
              primary={
                <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
              }
              secondary={
                <ColorTypo component='span' style={{ fontSize: 15 }}>
                  {isOpen ? value : getCollapseText(value)}
                </ColorTypo>
              }

            />
            {isOpen ? <ButtonText onClick={handlePressViewButton}>Thu gọn</ButtonText> : <ButtonText onClick={handlePressViewButton}>Xem thêm</ButtonText>}
          </>
      }
    </ListItemTabPart>
  )
}


function TabBody(props) {
  const value = React.useContext(WrapperContext)
  console.log('value:::', value);
  let content = ""
  if (value) {
    if (value.detailTask) {
      if (value.detailTask.description) {
        content = value.detailTask.description
      }
    }
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
              <span>{value.detailTask.name}</span>
              <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)', margin: '-4px', marginLeft: '5px' }} path={mdiPin} size={0.8} />
            </ContentText>
          </ListItemText>
        </ListItem>
        <Content value={content} />
        <ListItemButtonGroup>
          {props.isPause ?
            <ColorButton size='small' variant='outlined'
              style={{
                marginBottom: '10px',
                marginRight: '15px',
                color: '#dc3545',
                borderColor: '#dc3545',
              }}>
              Đang tạm dừng
        </ColorButton>
            :
            <DropdownButton size='small' values={['Đang làm', 'Đang chờ', 'Hoàn thành']} value={value} />
          }
          <DropdownButton size='small' values={['Ưu tiên cao', 'Ưu tiên trung bình', 'Ưu tiên thấp']} value={value} priority={true} />
          <ColorButton size='small' variant='contained' variantColor='red'
            style={{
              marginBottom: '10px',
              boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.1)'
            }}>
            Đã quá hạn
        </ColorButton>
        </ListItemButtonGroup>
        <ListItemTab disableRipple button onClick={() => props.setShow(1)}>
          <ColorTypo>Tiến độ</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={'16 ngày'} style={{ marginRight: 10 }} />
          <SimpleSmallProgressBarWrapper>
            <SimpleSmallProgressBar percentDone={28} percentTarget={70} color={colorPal['teal'][0]} targetColor={colorPal['orange'][0]} />
          </SimpleSmallProgressBarWrapper>
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(2)}>
          <ColorTypo>Công việc con</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={'2/3 việc hoàn thành'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(3)}>
          <ColorTypo>Nhắc hẹn</ColorTypo>
          <BadgeItem badge size='small' color='redlight' label={'9 Nhắc hẹn'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(4)}>
          <ColorTypo>Tài liệu</ColorTypo>
          <BadgeItem badge size='small' color='purplelight' label={'3 file'} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={'2 ảnh'} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='purplelight' label={'9 link'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(5)}>
          <ColorTypo>Chia sẻ vị trí</ColorTypo>
          <BadgeItem badge size='small' color='indigolight' label={'3 vị trí'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(6)}>
          <ColorTypo>Đề xuất, duyệt</ColorTypo>
          <BadgeItem badge size='small' color='orangelight' label={'10 đề xuất'} style={{ marginRight: 5 }} />
          <BadgeItem badge size='small' color='orangelight' label={'3 duyệt'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(7)}>
          <ColorTypo>Chỉ đạo, quyết định</ColorTypo>
          <BadgeItem badge size='small' color='bluelight' label={'10 nội dung'} />
        </ListItemTab>
        <ListItemTab disableRipple button onClick={() => props.setShow(8)}>
          <ColorTypo>Thành viên</ColorTypo>
          <AvatarCircleList total={20} display={6} />
        </ListItemTab>
      </StyledList>
    </Body >
  )
}

export default TabBody;
