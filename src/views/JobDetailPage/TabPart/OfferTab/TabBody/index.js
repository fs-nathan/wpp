import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem, ButtonGroup, Collapse, Button,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';
import OfferModal from '../OfferModal';
import ApproveModal from '../ApproveModal'

const Container = styled.div`
  padding: 10px 20px;
`;

const ApprovedContainer = styled.div`
  margin-left: 30px;
  margin-top: 10px;
`;

const StyledButton = styled(({ color, ...rest }) => <Button {...rest} />)`
  font-size: 11px;
  border-radius: 999px;
  & > span {
    color : ${props => props.color ? props.color : 'rgba(0, 0, 0, .4)'};
      display: flex;
  }
`

const StyleContent = styled(ColorTypo)`
  font-size: 14px;
`
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const ApprovedBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  // bien của modal phe duyet
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {props.approved && (
        <React.Fragment>
          <ApprovedContainer>
            <StyledTitleBox>
              <Avatar style={{ width: 25, height: 25 }} src={avatar} alt='avatar' />
              <div>
                <StyleContent variant='body1' bold>Trần Văn B</StyleContent>
                <ColorTypo variant='caption'>
                  <Badge component='small' color='bluelight' badge size='small' label={'Duyệt'} />
                </ColorTypo>
              </div>
              <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Icon path={mdiDotsHorizontal} size={1} />
              </IconButton>
            </StyledTitleBox>
            <StyledContentBox>
              <ColorTypo variant='caption'>18:00 - 12/12/2019</ColorTypo>
              <StyleContent >Lorem ipsum dolor sit.</StyleContent>
            </StyledContentBox>
          </ApprovedContainer>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => props.handleClickOpen()}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={handleClose}>Xóa</MenuItem>
          </Menu>
        </React.Fragment>
      )}
      {!props.approved && (
        <React.Fragment>
          <ApprovedContainer>
            <StyledTitleBox>
              <StyledButton variant="contained" size="small" color='#3498eb' onClick={handleClickOpen}>Phê duyệt</StyledButton>
              <StyledButton variant="contained" size="small" color='#eb3434'>Từ chối</StyledButton>
              <span />
            </StyledTitleBox>
            <ApproveModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen}/>
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
  border-radius: 5px;
  font-weight: bold;
`;


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
            <StyleContent variant='body1' bold> Nguyễn Văn A</StyleContent>
            <ColorTypo variant='caption'>
              <Badge component='small' size='small' badge color='orangelight' label={'Đề xuất'} /> với <ColorTypo color='orange' variant='caption'>Trần Văn B</ColorTypo> lúc 08:00 - 12/12/2019
            </ColorTypo>
          </div>
          <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsHorizontal} size={1} />
          </IconButton>
        </StyledTitleBox>
        <StyledContentBox>
          <StyleContent >Lorem ipsum dolor sit.</StyleContent>
        </StyledContentBox>
        <ApprovedBox approved={props.approved} handleClickOpen={() => props.handleClickOpen()}/>
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
        <MenuItem onClick={() =>
          props.handleClickOpen()
        }>Chỉnh sửa</MenuItem>
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
    border-bottom: 1px solid #a5a0a0;
    margin: 17px 0;
  }
`;

const ListOffer = (props) => {
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
      />
      <StyledList>
        {Array.from({ length: 3, }).map((_, index) => {
          return (
            <CustomListItem key={index} approved={index % 2 === 0} handleClickOpen={() => props.handleClickOpen()} handleClickClose={() => props.handleClickClose()}/>
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
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
        <ListOffer handleClickClose={() => handleClickClose()} handleClickOpen={() => handleClickOpen()}/>
      </Collapse>
      <Collapse in={value === 1} mountOnEnter unmountOnExit>
        {null}
      </Collapse>
      <Collapse in={value === 2} mountOnEnter unmountOnExit>
        {null}
      </Collapse>
      <OfferModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen}/>
    </Container>
  )
}

export default TabBody;
