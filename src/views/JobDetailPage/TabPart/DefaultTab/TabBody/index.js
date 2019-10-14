import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiChevronRight } from '@mdi/js';
import { List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
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
  &:last-child { 
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  & > *:nth-last-child(2) {
    margin-right: 0;
    margin-left: auto;
  }
  & > *:last-child {
    margin-right: 0;
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
    padding: 8px 0;
  }
`;

const SimpleSmallProgressBarWrapper = styled.div`
  width: 150px;
`;

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
    <ColorButton variantColor='green' size='small' aria-controls="simple-menu" aria-haspopup="true" variant="contained"
      endIcon={
        <Icon path={mdiMenuDown} size={1} color={colorPal['green'][1]}/>
      }
    />
  ); 
  else return (
    <React.Fragment>
      <ColorButton variantColor='green' size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" variant="contained"
        endIcon={
          <Icon path={mdiMenuDown} size={1} color={colorPal['green'][1]}/>
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
          vertical: -30,
          horizontal: 'right',
        }}
      >
        {
          values.map((value, index) => {
            return (
              <MenuItem key={index} onClick={() => handleSelect(index)}>
                {index === selected ? (
                  <ListItemIcon>
                    <Icon path={mdiCheckCircle} size={1} color={colorPal['green'][0]}/>
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <Icon path={mdiCheckboxBlankCircleOutline} size={1} color={colorPal['default'][0]}/>
                  </ListItemIcon>
                )}
                <ListItemText>
                  {value}
                </ListItemText>
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
        <ListItemText 
          primary={ 
            <ColorTypo color='gray' uppercase bold>
              Tên công việc
            </ColorTypo>
          }
          secondary={
            <ColorTypo component='span'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, aliquam.
            </ColorTypo>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText 
          primary={ 
            <ColorTypo color='gray' uppercase bold>
              Mô tả công việc
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
        <DropdownButton size='small' values={['Đang chờ', 'Đang làm', 'Hoàn thành']}/>
        <DropdownButton size='small' values={['Ưu tiên cao', 'Ưu tiên trung bình', 'Ưu tiên thấp']}/>
        <ColorButton size='small' variant='contained' variantColor='red'>
          Đã quá hạn
        </ColorButton>
      </ListItemButtonGroup>
      <ListItemTab button onClick={() => setShow(1)}>
        <ColorTypo>Tiến độ</ColorTypo>
        <ColorChip badge size='small' color='blue' label={'16 ngày'} />
        <SimpleSmallProgressBarWrapper>
          <SimpleSmallProgressBar percentDone={28} percentTarget={70} color={colorPal['green'][0]} targetColor={colorPal['red'][0]} />
        </SimpleSmallProgressBarWrapper>
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(2)}>
        <ColorTypo>Công việc con</ColorTypo>
        <ColorChip badge size='small' color='orange' label={'2/3 việc hoàn thành'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(3)}>
        <ColorTypo>Nhắc hẹn</ColorTypo>
        <ColorChip badge size='small' color='red' label={'9 Nhắc hẹn'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(4)}>
        <ColorTypo>Tài liệu</ColorTypo>
        <ColorChip badge size='small' color='purple' label={'3 file'} />
        <ColorChip badge size='small' color='yellow' label={'2 ảnh'} />
        <ColorChip badge size='small' color='teal' label={'9 link'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(5)}>
        <ColorTypo>Chia sẻ vị trí</ColorTypo>
        <ColorChip badge size='small' color='cyan' label={'3 vị trí'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(6)}>
        <ColorTypo>Đề xuất, duyệt</ColorTypo>
        <ColorChip badge size='small' color='indigo' label={'10 đề xuất'} />
        <ColorChip badge size='small' color='indigo' label={'3 duyệt'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(7)}>
        <ColorTypo>Chỉ đạo, quyết định</ColorTypo>
        <ColorChip badge size='small' color='pink' label={'10 nội dung'} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
      <ListItemTab button onClick={() => setShow(8)}>
        <ColorTypo>Thành viên</ColorTypo>
        <AvatarCircleList total={20} display={6} />
        <Icon path={mdiChevronRight} size={1}/>
      </ListItemTab>
    </StyledList>
  )
}

export default TabBody;
