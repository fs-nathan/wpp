import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDownload, mdiDotsHorizontal, mdiImage, mdiFile, mdiLink, mdiDotsHorizontalCircle } from '@mdi/js';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, IconButton, Menu, MenuItem, ButtonGroup,
  GridList, GridListTile, ListSubheader, ListItemIcon,
  Collapse,
  Typography
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';
import iconDoc from '../../../../../assets/doc.png';

const Container = styled.div`
  padding: 20px;
`;

const SubHeader = styled(ListSubheader)`
  padding: 0;
  font-size: 14px;
`
const ImageMedia = styled(GridListTile)`
  height: 84px !important;
  width: 84px !important;
  margin-right: 4px;
  margin-bottom: 19px;
  padding: 0;
  position: relative;
`

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7
  }
`
const ButtonIcon = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`
const Div = styled.div`
  display: none;
  ${ImageMedia}:hover & {
    display: inline;
  }
`

const MenuListItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
          <Div>  
            <ButtonIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" size={'small'} >
              <Icon path={mdiDotsHorizontal} size={1} color={'#fff'} />
            </ButtonIcon>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: -31,
                horizontal: -21,
              }}
            >
              <MenuItem onClick={handleClose}>Chia sẻ</MenuItem>
              <MenuItem onClick={handleClose}>Xem tin nhắn</MenuItem>
              <MenuItem onClick={handleClose}>Xóa</MenuItem>
            </Menu>
          </Div>
  )
}

const MediaBox = ({isHover}) => {
  // { isHover 

  // }
  return (
    <GridList cellHeight={60} cols={5}>
      <GridListTile key='header-1' cols={5} style={{ height: 'auto' }}>
        <SubHeader component='span'>09/09/2019</SubHeader>
      </GridListTile>
      {Array.from({ length: 7 }).map((_, index) => {
        return (
          <ImageMedia key={`1-${index}`}>
            <Image src={avatar} alt='avatar' />   
            <MenuListItem />
          </ImageMedia>
        );
      })}
      <GridListTile key='header-2' cols={5} style={{ height: 'auto' }}>
        <SubHeader component='span'>08/09/2019</SubHeader>
      </GridListTile>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <ImageMedia key={`2-${index}`}>
            <Image src={avatar} alt='avatar' />
            <MenuListItem />
          </ImageMedia>
        );
      })}
    </GridList>
  );
}

const MediaContainer = () => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập tên media, ngày đăng, người đăng...' />
      <MediaBox />
    </React.Fragment>
  );
}

const FileBoxStyledList = styled(List)``;
const FileBoxStyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  & > img {
    width: 50px;
    height: 50px;
  }
  & > div {
    margin-left: 10px;
    &:last-child {
      margin-left: auto;
      text-align: end;
    }
  }
`;

const FileBox = () => {

  const CustomListItem = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (evt) => {
      setAnchorEl(evt.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    return (
      <React.Fragment>
        <FileBoxStyledListItem>
          <img src={iconDoc} alt='avatar' />
          <div>
            <ColorTypo variant='body1'>Do an.Update1-13.8.19.docx</ColorTypo>
            <ColorTypo variant='caption'>
              <IconButton size='small'>
                <Icon path={mdiDownload} size={1} />
              </IconButton>
              1.1 MB
            </ColorTypo>
          </div>
          <div>
            <ColorTypo variant='body1'>13/08/2019</ColorTypo>
            <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
              <Icon path={mdiDotsHorizontal} size={1} />
            </IconButton>
          </div>
        </FileBoxStyledListItem>
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
      </React.Fragment>
    );
  }

  return (
    <FileBoxStyledList>
      <CustomListItem />
      <CustomListItem />
      <CustomListItem />
    </FileBoxStyledList>
  );
}

const FileContainer = () => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập từ khóa file' />
      <FileBox />
    </React.Fragment>
  );
}

const ListItemLink = styled(ListItem)`
  padding-left: 0;
  & > *:first-child {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #e4e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 23px;
  }
`
const HeaderSubText = styled(ListSubheader)`
  font-size: 13px;
  color: #6e6d6d;
`
const LinkBox = () => {

  const CustomListItem = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (evt) => {
      setAnchorEl(evt.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    return (
      <React.Fragment>
        <ListItemLink >
          <Typography component='div'>
            <Icon path={mdiLink} size={1} color={'green'}/>
          </Typography>
          <ListItemText>
            <a href='https://google.com.vn' target="_blank">https://google.com.vn</a>
          </ListItemText>
          <ListItemIcon>
            <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
              <Icon path={mdiDotsHorizontal} size={1} />
            </IconButton>
          </ListItemIcon>
        </ListItemLink>
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
      </React.Fragment>
    );
  }

  return (
    <List subheader={<li />}>
      <HeaderSubText component='p' style={{ padding: 0, margin: 0}}>09/09/2019</HeaderSubText>
      <CustomListItem />
      <CustomListItem />
      <CustomListItem />
    </List>
  );
}

const LinkContainer = () => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập từ khóa link' />
      <LinkBox />
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
          startIcon={<Icon path={mdiImage} size={1} color={value === 0 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 0)}
        >
          {value === 0 ? <ColorTypo bold>Media</ColorTypo> : <ColorTypo color='gray'>Media</ColorTypo>}
        </ColorButton>
        <ColorButton
          startIcon={<Icon path={mdiFile} size={1} color={value === 1 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 1)}
        >
          {value === 1 ? <ColorTypo bold>File</ColorTypo> : <ColorTypo color='gray'>File</ColorTypo>}
        </ColorButton>
        <ColorButton
          startIcon={<Icon path={mdiLink} size={1} color={value === 2 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 2)}
        >
          {value === 2 ? <ColorTypo bold>Link</ColorTypo> : <ColorTypo color='gray'>Link</ColorTypo>}
        </ColorButton>
      </StyledButtonGroup>
      <Collapse in={value === 0} mountOnEnter unmountOnExit>
        <MediaContainer />
      </Collapse>
      <Collapse in={value === 1} mountOnEnter unmountOnExit>
        <FileContainer />
      </Collapse>
      <Collapse in={value === 2} mountOnEnter unmountOnExit>
        <LinkContainer />
      </Collapse>
    </Container>
  )
}

export default TabBody;
