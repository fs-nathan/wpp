import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  IconButton, Menu, MenuItem, ButtonGroup,
  ListSubheader, ListItemIcon, Collapse,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import { Scrollbars } from 'react-custom-scrollbars';
import { WrapperContext } from '../../../index'
const Container = styled.div`
  padding: 10px 20px 50px 20px;
`;
const ItemAvatar = styled(ListItemAvatar)`
  & > div {
    background: #d6d6d6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;
const HeaderSubText = styled(ListSubheader)`
  font-size: 13px;
  color: #6e6d6d;
`
const StyledCommonLocation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const CustomListItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  const value = React.useContext(WrapperContext)
  return (
    <ListItem>
      {value.location.locations.map((location, idx) => {
        return (
          <div key={idx} style={{ width: "100%"}}>
            <HeaderSubText component='p' style={{ padding: 0, margin: 0 }}>{location.date_create}</HeaderSubText>
            {location.locations.map((item, key) => {
              return (
                <StyledCommonLocation key={key}>
                  <ItemAvatar>
                    <div>
                      <Icon path={mdiMapMarker} alt='map' size={1.1} color={'ff9d00'} />
                    </div>
                  </ItemAvatar>
                  <ListItemText
                    primary={item.user_share}
                    secondary={
                      <span>
                    <ColorTypo variant='caption' color='blue'>Lúc {item.time_create} - {item.date_create}</ColorTypo>
                        <br />
                    <ColorTypo variant='caption'>{item.address}</ColorTypo>
                      </span>
                    }
                  />
                  <ListItemIcon style={{ display: 'contents'}}>
                    <ButtonIcon size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                      <Icon path={mdiDotsHorizontal} size={1} />
                    </ButtonIcon>
                  </ListItemIcon>
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
                    <MenuItem onClick={handleClose}>Chia sẻ</MenuItem>
                    <MenuItem onClick={handleClose}>Xem tin nhắn</MenuItem>
                    <MenuItem onClick={handleClose}>Xóa</MenuItem>
                  </Menu>
                </StyledCommonLocation>
              )
            })}
          </div>
        )
      })}
    </ListItem>
  );
}

const WrapList = styled(List)`
  & > div {
    padding: 0
  }
  & > li {
    padding: 5px 0;
    & > *:last-child {
      min-width: auto !important;
    }
  }
`

const LocationShareBox = () => {
  return (
    <React.Fragment>
      <SearchInput
        placeholder="Nhập từ khóa"
        fullWidth
      />
      <WrapList subheader={<li />}>
        <CustomListItem />
      </WrapList>
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
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <Container>
        <StyledButtonGroup fullWidth variant="text" aria-label="full width outlined button group">
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0 ? <ColorTypo bold>Tất cả</ColorTypo> : <ColorTypo color='gray'>Tất cả</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>Vị trí của tôi</ColorTypo> : <ColorTypo color='gray'>Vị trí của tôi</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        <Collapse in={value === 0} mountOnEnter unmountOnExit>
          <LocationShareBox />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          {null}
        </Collapse>
      </Container>
    </Body>
  )
}

export default TabBody;
