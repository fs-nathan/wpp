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
import { Scrollbars } from 'react-custom-scrollbars'


const Container = styled.div`
  padding: 10px 20px;
`;

const ApprovedContainer = styled.div`
  margin-left: 30px;
  margin-top: 10px;
`;

// const StyledButton = styled(({ color, ...rest }) => <Button {...rest} />)`
//   font-size: 11px;
//   border-radius: 999px;
//   & > span {
//     color : ${props => props.color ? props.color : 'rgba(0, 0, 0, .4)'};
//       display: flex;
//   }
// `

const StyledButton = styled(Button)`
  box-shadow: none;
  background: none;
  color: #2196F3;
  padding: 3px 9px;
  border : 1px solid #2196F3;
  &:hover {
    box-shadow: none;
  background: #2196F3;
  color: white;
  }
`
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;

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
              <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Icon path={mdiDotsHorizontal} size={1} />
              </ButtonIcon>
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
              <StyledButton variant="contained" size="small" onClick={handleClickOpen}>Phê duyệt</StyledButton>
              <Button variant="outlined" size="small" >Từ chối</Button>
              <span />
            </StyledTitleBox>
            <ApproveModal {...props} isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen}  />
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
  background-color: #f9f9f9;
  padding: 8px 10px;
  border-radius: 5px;
  font-weight: bold;
`;

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
  const {
    content, dataHander, date_create, status,
    user_create_avatar, user_create_name, user_can_handers
  } = props.offer

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
          <Avatar style={{ width: 25, height: 25 }} src={user_create_avatar} alt='avatar' />
          <div>
            <StyleContent variant='body1' bold>{user_create_name}</StyleContent>
            <ColorTypo variant='caption'>
              <Badge component='small' size='small' badge color='orangelight' label={'Đề xuất'} />
              &nbsp;
              với
              &nbsp;
            <ColorTypo color='orange' variant='caption'>{user_can_handers.join(", ")}</ColorTypo> lúc {date_create}
            </ColorTypo>
          </div>
          <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsHorizontal} size={1} />
          </ButtonIcon>
        </StyledTitleBox>
        <StyledContentBox>
          <StyleContent>{content}</StyleContent>
        </StyledContentBox>
        <ApprovedBox approved={dataHander} handleClickOpen={() => props.handleClickOpen()} />
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
        <MenuItem onClick={() => {
          props.deleteOfferByTaskId(props.offer.id)
          handleClose()
        }}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0 20px 0;
    border-bottom: 1px solid #dedede;
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

        {props.offer.map((item) => {
          return (
            <CustomListItem
              {...props}
              key={item.id} offer={item}
              handleClickOpen={() => props.handleClickOpen()}
              handleClickClose={() => props.handleClickClose()} />
          )
        })}


      </StyledList>
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
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
          <ListOffer
            handleClickClose={() => handleClickClose()}
            handleClickOpen={() => handleClickOpen()}
            {...props}
          />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          {null}
        </Collapse>
        <Collapse in={value === 2} mountOnEnter unmountOnExit>
          {null}
        </Collapse>
        <OfferModal {...props} isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} />
      </Container>
    </Body>
  )
}

export default TabBody;
