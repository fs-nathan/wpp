import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import { 
  Avatar, IconButton, Menu, MenuItem, ButtonGroup,Collapse,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';
import DemandModal from '../DemandModal'

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
          <Avatar style={{ width: 25, height: 25 }} src={avatar} alt='avatar' />
          <div>
            <Text variant='body1' bold>Nguyễn Văn A</Text>
            <ColorTypo variant='caption'>
              <Badge color={props.isDemand ? 'orangelight' : 'bluelight'} label={props.isDemand ? 'Chỉ đạo' : 'Quyết định'} size='small' badge component='small' /> lúc 08:00 - 12/12/2019
            </ColorTypo>
          </div>
          <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsHorizontal} size={1} />
          </ButtonIcon>
        </StyledTitleBox>
        <StyledContentBox>
          <Text >Lorem ipsum dolor sit.</Text>
        </StyledContentBox>
      </StyledListItem>
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

const ListDemand = () => { 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>  
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
      />
      <StyledList>
        {Array.from({ length: 3, }).map((_, index) => {
          return (
            <CustomListItem key={index} isDemand={index % 2 === 0} handleClickOpen={() => handleClickOpen()}/>
          )
        })}    
      </StyledList>
      
      {/* modal chi dao quyet dinh */}
      <DemandModal isOpen={open} handleClose={handleClose} handleOpen={handleClickOpen}/>
    </React.Fragment>
  );
}

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <StyledButtonGroup fullWidth variant="text" aria-label="full width outlined button group">
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
        <ListDemand />
      </Collapse>
      <Collapse in={value === 1} mountOnEnter unmountOnExit>
        {null}
      </Collapse>
      <Collapse in={value === 2} mountOnEnter unmountOnExit>
        {null}
      </Collapse>
    </Container>
  )
}

export default TabBody;
