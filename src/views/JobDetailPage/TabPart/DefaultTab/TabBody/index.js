import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiArrowRightBoldCircle, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiChevronRight, mdiPin } from '@mdi/js';
import { List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import colorPal from '../../../../../helpers/colorPalette';

const ListItemButtonGroup = styled(ListItem)`
  flex-wrap: wrap;  
  & > * {
    text-transform: none;
    margin-right: 5px;
    margin-bottom: 3px;
  }
`;

const ListItemTab = styled(ListItem)`
  border-top: 1px solid rgba(0, 0, 0, .1);
  && {
    padding: 15px 10px 15px 20px;
  }
  &:last-child { 
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  & > *:nth-last-child(2) {
    margin-right: 0;
    margin-left: auto;
  }
  & > *:last-child {
    margin: '20px 0'
  }
  & > *:not(last-child) {
    margin-right: 10px;
  }
  & > *:first-child {
    font-weight: bold;
  }
`;

const StyledList = styled(List)`
  & > * {
    padding: 8px 0 8px 20px;
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

`

function DropdownButton({ values }) {

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
    handleClose();
  }

  if (values.length === 0) return (
    <ColorButton variantColor='teal' size='small' aria-controls="simple-menu" aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
      endIcon={
        <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
      }
    />
  );
  else return (
    <React.Fragment>
      <ColorButton variantColor='teal' size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
        endIcon={
          <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
        }
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

function TabBody({ setShow }) {

  return (
    <StyledList>
      <ListItem>
        <ListItemText>

          <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>
            Tên công việc
          </ColorTypo>
          <ContentText component='span'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, aliquam.
            <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)' }} path={mdiPin} size={0.8} />
          </ContentText>

        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>
              Mô tả
            </ColorTypo>
          }
          secondary={
            <ColorTypo component='span'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, aliquam.
            </ColorTypo>
          }
        />
      </ListItem>
      <ListItemButtonGroup>
        <DropdownButton size='small' values={['Đang chờ', 'Đang làm', 'Hoàn thành']} />
        <DropdownButton size='small' values={['Ưu tiên cao', 'Ưu tiên trung bình', 'Ưu tiên thấp']} />
        <ColorButton size='small' variant='contained' variantColor='red'
          style={{
            marginBottom: '10px',
            boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.1)'
          }}>
          Đã quá hạn
        </ColorButton>
      </ListItemButtonGroup>
      <ListItemTab button onClick={() => setShow(1)}>
        <ColorTypo>Tiến độ</ColorTypo>
        <BadgeItem badge size='small' color='orangelight' label={'16 ngày'} />
        <SimpleSmallProgressBarWrapper>
          <SimpleSmallProgressBar percentDone={28} percentTarget={70} color={colorPal['teal'][0]} targetColor={colorPal['orange'][0]} />
        </SimpleSmallProgressBarWrapper>
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(2)}>
        <ColorTypo>Công việc con</ColorTypo>
        <BadgeItem badge size='small' color='bluelight' label={'2/3 việc hoàn thành'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(3)}>
        <ColorTypo>Nhắc hẹn</ColorTypo>
        <BadgeItem badge size='small' color='redlight' label={'9 Nhắc hẹn'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(4)}>
        <ColorTypo>Tài liệu</ColorTypo>
        <BadgeItem badge size='small' color='purplelight' label={'3 file'} />
        <BadgeItem badge size='small' color='purplelight' label={'2 ảnh'} />
        <BadgeItem badge size='small' color='purplelight' label={'9 link'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(5)}>
        <ColorTypo>Chia sẻ vị trí</ColorTypo>
        <BadgeItem badge size='small' color='indigolight' label={'3 vị trí'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(6)}>
        <ColorTypo>Đề xuất, duyệt</ColorTypo>
        <BadgeItem badge size='small' color='orangelight' label={'10 đề xuất'} />
        <BadgeItem badge size='small' color='orangelight' label={'3 duyệt'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(7)}>
        <ColorTypo>Chỉ đạo, quyết định</ColorTypo>
        <BadgeItem badge size='small' color='bluelight' label={'10 nội dung'} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(8)}>
        <ColorTypo>Thành viên</ColorTypo>
        <AvatarCircleList total={20} display={6} />
        <Icon path={mdiChevronRight} size={1} />
      </ListItemTab>
    </StyledList>

  )
}

export default TabBody;