import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem, ButtonGroup, Collapse,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';
import DemandModal from '../DemandModal'
import { Scrollbars } from 'react-custom-scrollbars';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`

const Container = styled.div`
  padding: 0 20px;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 5px;
  }
  & > *:last-child   {
    margin-left: auto;
  }
`;

const StyledContentBox = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  padding: 8px 10px;
  font-weight: 500;
`;

const Text = styled(ColorTypo)`
  font-size: 15px;
`
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
  
`
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

const CustomListItem = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <React.Fragment>
      <StyledListItem>
        <StyledTitleBox>
          <Avatar style={{ width: 25, height: 25 }} src={props.item.user_create_avatar} alt='avatar' />
          <div>
            <Text variant='body1' bold>{props.item.user_create_name}</Text>
            <ColorTypo variant='caption'>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Badge
                  color={props.isDemand ? 'orangelight' : 'bluelight'}
                  label={props.isDemand ? 'Chỉ đạo' : 'Quyết định'}
                  size='small'
                  badge
                  component='small' >
                </Badge>
                <p style={{margin: '0 7px', fontSize: '0.75em', color: '#a6a6a6'}}>lúc {props.item.date_create}</p>
              </div>
            </ColorTypo>
          </div>
          <ButtonIcon size='small' onClick={handleClick} >
            <Icon path={mdiDotsHorizontal} size={1} />
          </ButtonIcon>
        </StyledTitleBox>
        <StyledContentBox>
          <Text >{props.item.content}</Text>
        </StyledContentBox>
      </StyledListItem>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          props.handleClickOpen()
        }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0;
  }
`;

const ListDemand = (props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    // props.deleteRemindWByRemindId(props.item.id)
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
      />
      <StyledList>
        {props.command.map((item, index) => {
          return (
            <CustomListItem key={index} isDemand={index % 2 === 0} handleClickOpen={() => handleClickOpen()} item={item} {...props} />
          )
        })}
      </StyledList>

      {/* modal chi dao quyet dinh */}
      <DemandModal isOpen={open} handleClose={handleClose} handleOpen={handleClickOpen} />
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        {...props} />
    </React.Fragment>
  );
}

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <Container>
        <StyledButtonGroup fullWidth variant="text" >
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0 ? <ColorTypo bold>Tất cả (4)</ColorTypo> : <ColorTypo color='gray'>Tất cả (4)</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>Chỉ đạo (2)</ColorTypo> : <ColorTypo color='gray'>Chỉ đạo (2)</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2 ? <ColorTypo bold>Quyết định (2)</ColorTypo> : <ColorTypo color='gray'>Quyết định (2)</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        <Collapse in={value === 0} mountOnEnter unmountOnExit>
          <ListDemand {...props} />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          {null}
        </Collapse>
        <Collapse in={value === 2} mountOnEnter unmountOnExit>
          {null}
        </Collapse>
      </Container>
    </Body>
  )
}

export default TabBody;
