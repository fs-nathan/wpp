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

const Container = styled.div`
  padding: 10px 0;
`;

const ApprovedContainer = styled.div`
  margin-left: 30px;
  margin-top: 10px;
`;

const ApprovedBox = ({ approved = false }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      {approved && (
        <React.Fragment>
          <ApprovedContainer>
            <StyledTitleBox>
              <Avatar style={{ width: 25, height: 25 }} src={avatar} alt='avatar' />
              <div>
                <ColorTypo variant='body1'>Trần Văn B</ColorTypo>
                <ColorTypo variant='caption'>
                  <ColorChip component='small' color='green' badge size='small' label={'Duyệt'} /> lúc 18:00 - 12/12/2019
                </ColorTypo>
              </div>
              <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Icon path={mdiDotsHorizontal} size={1} />
              </IconButton>
            </StyledTitleBox>
            <StyledContentBox>
              <ColorTypo bold>Lorem ipsum dolor sit.</ColorTypo>
            </StyledContentBox>
          </ApprovedContainer>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={handleClose}>Xóa</MenuItem>
          </Menu>
        </React.Fragment>
      )}
      {!approved && (
        <React.Fragment>
          <ApprovedContainer>
            <StyledTitleBox>
              <ColorButton variantColor='green' variant='outlined' size='small'>Duyệt</ColorButton>
              <ColorButton variantColor='red' variant='outlined' size='small'>Từ chối</ColorButton>
              <span />
            </StyledTitleBox>
          </ApprovedContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

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
  margin-left: 30px;
  margin-top: 10px;
  background-color: #eee;
  padding: 8px 10px;
  border-radius: 999px;
  font-weight: bold;
`;

const CustomListItem = ({ approved = false }) => {

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
            <ColorTypo variant='body1'>Nguyễn Văn A</ColorTypo>
            <ColorTypo variant='caption'>
              <ColorChip component='small' size='small' badge color='orange' label={'Đề xuất'} /> với <ColorTypo color='orange' variant='caption'>Trần Văn B</ColorTypo> lúc 08:00 - 12/12/2019
            </ColorTypo>
          </div>
          <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsHorizontal} size={1} />
          </IconButton>
        </StyledTitleBox>
        <StyledContentBox>
          <ColorTypo bold>Lorem ipsum dolor sit.</ColorTypo>
        </StyledContentBox>
        <ApprovedBox approved={approved} />
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
        <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
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

const ListOffer = () => { 
  return (
    <React.Fragment>  
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
      />
      <StyledList>
        {Array.from({ length: 3, }).map((_, index) => {
          return (
            <CustomListItem key={index} approved={index % 2 === 0} />
          )
        })}    
      </StyledList>
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
          {value === 1 ? <ColorTypo bold>Đã duyệt (2)</ColorTypo> : <ColorTypo color='gray'>Đã duyệt (2)</ColorTypo>}
        </ColorButton>
        <ColorButton 
          onClick={evt => handleChange(evt, 2)}
        >
          {value === 2 ? <ColorTypo bold>Chờ duyệt (2)</ColorTypo> : <ColorTypo color='gray'>Chờ duyệt (2)</ColorTypo>}
        </ColorButton>
      </StyledButtonGroup>
      <Collapse in={value === 0} mountOnEnter unmountOnExit>
        <ListOffer />
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
