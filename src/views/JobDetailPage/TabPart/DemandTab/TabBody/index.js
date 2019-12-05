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
// import avatar from '../../../../../assets/avatar.jpg';
import DemandModal from '../DemandModal'
import { Scrollbars } from 'react-custom-scrollbars';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`

const Container = styled.div`
  padding: 0 20px 50px 20px;
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
const StyledMenuDemand = styled.div`
  opacity: 0 ;
  ${StyledListItem}:hover & {
    opacity: 1;
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Badge
                  color={props.isDemand ? 'orangelight' : 'bluelight'}
                  label={props.isDemand ? 'Chỉ đạo' : 'Quyết định'}
                  size='small'
                  badge
                  component='small' >
                </Badge>
                <p style={{ margin: '0 7px', fontSize: '0.75em', color: '#a6a6a6' }}>lúc {props.item.date_create}</p>
              </div>
            </ColorTypo>
          </div>
          <StyledMenuDemand>
            <ButtonIcon size='small' onClick={handleClick} >
              <Icon path={mdiDotsHorizontal} size={1} />
            </ButtonIcon>
          </StyledMenuDemand>
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
        <MenuItem onClick={() => { props.handleClickOpen() }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={props.handleOpenModalDelete}>Xóa</MenuItem>
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
  const [open, setOpen] = React.useState(false)
  const [isEditDemand] = React.useState(true)
  const [selectedItem, setSelectedItem] = React.useState({ content: "", type: -1 })
  const handleClickEditItem = item => {
    setSelectedItem(item)
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = item => {
    setOpenDelete(true);
    setSelectedItem({...item, command_id: item.id})
    // setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    props.deleteCommandByCommandId(selectedItem.id)
  }
  const confirmUpdateCommand = ({ id, content, type }) => {
    props.updateCommandByTaskId(id, content, type)
  }

  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
      />
      <StyledList>
        {props.activeArr.map((item, index) => {
          return (
            <CustomListItem
              activeArr={item}
              key={index}
              isDemand={item.type !== 0}
              handleClickOpen={() => handleClickEditItem(item)}
              handleOpenModalDelete={() => handleOpenModalDelete(item)}
              item={item}
              {...props}
            />
          )
        })}
      </StyledList>

      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        handleClose={handleClose}
        // handleOpen={handleClickOpen}
        isEditDemand={isEditDemand}
        item={selectedItem}
        confirmUpdateCommand={confirmUpdateCommand}
      />
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
            {value === 0
              ? <ColorTypo bold>Tất cả ({props.command.length})</ColorTypo>
              : <ColorTypo color='gray'>Tất cả ({props.command.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1
              ? <ColorTypo bold>Chỉ đạo ({props.commandItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Chỉ đạo ({props.commandItems.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2
              ? <ColorTypo bold>Quyết định ({props.decisionItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Quyết định ({props.decisionItems.length})</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        <Collapse in={value === 0} mountOnEnter unmountOnExit>
          <ListDemand 
          {...props} 
          activeArr={props.command} 
          />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          <ListDemand {...props} activeArr={props.commandItems} />
        </Collapse>
        <Collapse in={value === 2} mountOnEnter unmountOnExit>
          <ListDemand {...props} activeArr={props.decisionItems} />
        </Collapse>
      </Container>
    </Body>
  )
}

export default TabBody;
