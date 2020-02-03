import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';
import ColorTypo from '../../../../../components/ColorTypo'
import ColorChip from '../../../../../components/ColorChip';
import colorPal from '../../../../../helpers/colorPalette';
import MemberModal from '../MemberModal'
import { Scrollbars } from 'react-custom-scrollbars'
import { WrapperContext } from '../../../index'
const members = [
  { id: 1, name: 'Trần Văn Nam', role: 'Giám đốc', projectRole: 'Admin', authorityList: ['Giao việc'] },
  { id: 2, name: 'Trần Văn Nam', projectRole: 'Quản lý', authorityList: ['Giao việc', 'Giám sát'] },
  { id: 3, name: 'Trần Văn Nam', role: 'Khác', projectRole: 'Admin', authorityList: ['Giao việc'] },
]


// const Container = styled.div`
//   padding: 10px 20px 50px 20px;
// `;


const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px;
  margin-right: 6px;
`
const TextName = styled(ColorTypo)`
  font-size: 15px;
  padding-right: 4px;
`
const Text = styled(ColorTypo)`
  font-size: 14px;
  color: ${colorPal['gray'][0]}
  border-left: 1px solid ${colorPal['gray'][0]}
  padding-left: 3px;
  display: inline;
`
// const StyledDiv = styled.span`
//   display: flex;
//   margin-bottom: 7px;
// `

const BadgeAdmin = styled(ColorTypo)`
  font-size: 11px;
  font-weight: 600;
  margin-right: 7px;
`
const MenuItemCheck = styled(MenuItem)`
  padding-right: 30px;
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
const StyledListItem = styled(ListItem)`
    padding : 7px 0;
    &:hover .styled-menu-member {
      opacity: 1;
    }
`

// const StyledMenuMember = styled.div`
//   opacity: 0 ;
//   ${StyledListItem}:hover & {
//     opacity: 1;
//   }
// `
const StyledAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
`
// const StyledMenuMember = styled.div`
//   opacity: 0 ;
//   ${StyledListItem}:hover & {
//     opacity: 1;
//   }
// `

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const getBadgeProjectRole = (projectRole) => {
  let color = ""
  switch (projectRole) {
    case "Admin":
      color = "red";
      break;
    default:
      color = "black";
      break;
  }
  return (
    <BadgeAdmin color={color} variant='caption' component='span'>{projectRole}</BadgeAdmin>
  )
}


const MemberListItem = ({ name, role, projectRole, authorityList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  // modal members
  const [open, setOpen] = React.useState(false);

  const handleCloseMembers = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  
  return (
    <React.Fragment>
      <StyledListItem>
        <ListItemAvatar>
          <StyledAvatar src={avatar} alt='avatar' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <span className="wrapper-span">
                <TextName component="span" bold>{name}</TextName>
                {
                  role &&
                  <Text component="span">{role}</Text>
                }
              </span>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <span className="wrapper-span">
                {getBadgeProjectRole(projectRole)}
                {
                  authorityList.map((authority, index) =>
                    <BadgeItem
                      key={index}
                      color={'light-green'}
                      label={authority}
                      size='small'
                      badge
                      component='span' />
                  )
                }
              </span>
            </React.Fragment>
          }
        />
        <div className="styled-menu-member">
          <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsVertical} size={1} />
          </ButtonIcon>
        </div>
      </StyledListItem>
      {/* modal members */}
      <MemberModal isOpen={open} handleCloseMembers={handleCloseMembers} handleOpen={handleClickOpen} />
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
        <MenuItemCheck onClick={() => { handleClickOpen() }}>Chi tiết</MenuItemCheck>
        <MenuItemCheck onClick={handleClose}>Xóa</MenuItemCheck>
      </Menu>
    </React.Fragment>
  );
}

const MemberList = () => {
  const [data] = React.useState(members);

  return (
    <List>
      {data.map((element, index) => {
        return (
          <MemberListItem key={element.id} {...element} />
        );
      })}
    </List>
  );
}

function TabBody() {
  const value = React.useContext(WrapperContext)
  const searchMemberTabPart = (e) => {
    value.searchMember(e.target.value)
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-member-tabbody">
        <SearchInput 
          placeholder={'Nhập từ khóa'} 
          fullWidth
          onChange={e => searchMemberTabPart(e)}
          />
        <MemberList />
      </div>
    </Body>
  )
}

export default TabBody;
