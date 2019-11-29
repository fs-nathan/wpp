import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDownload, mdiDotsHorizontal, mdiImage, mdiFile, mdiLink } from '@mdi/js';
import {
  List, ListItem, ListItemText,
  IconButton, Menu, MenuItem, ButtonGroup,
  GridList, GridListTile, ListSubheader, ListItemIcon,
  Collapse,
  Typography
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
import iconDoc from '../../../../../assets/doc.png';
import { Scrollbars } from 'react-custom-scrollbars';


const Container = styled.div`
  padding: 20px;
`;

const SubHeader = styled(ListSubheader)`
  padding: 0;
  font-size: 14px;
`
const ImageMedia = styled(GridListTile)`
  margin-right: 7px;
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
const Button = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
const WrapImage = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const MediaBox = (props) => {
  // console.log('mediabox::', props);
  return (
    <GridList cellHeight={60} cols={5} style={{ display: "inline-block" }}>
      {props.image.images.map((image, key) => {
        return (
          <div key={key}>
            <GridListTile  cols={5} style={{ height: '100%' }}>
              <SubHeader component='div'>{image.date_create}</SubHeader>
            </GridListTile>
            <WrapImage>

              {image.images.map((item, idx) => {
                return (

                  <ImageMedia key={idx}>
                    <Image src={item.url} alt='avatar' />
                    <MenuListItem />
                  </ImageMedia>

                )
              })}
            </WrapImage>
          </div>
        );
      })}
      {/* <GridListTile key='header-1' cols={5} style={{ height: 'auto' }}>
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
      })} */}
    </GridList>
  );
}

const MediaContainer = (props) => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập tên media, ngày đăng, người đăng...' />
      <MediaBox {...props} />
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
const FileName = styled.div`
  width: 300px;
  word-break: break-word;
`

const FileBox = (props) => {
  console.log('props.file:::', props);

  // const CustomListItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    // <React.Fragment>
    <FileBoxStyledList>
      {props.file.files.map((item, idx) => {
        return (

          <FileBoxStyledListItem key={idx}>
            <img src={iconDoc} alt='avatar' />
            <div>
              <FileName>{item.name}</FileName  >
              <ColorTypo variant='caption'>
                <Button size='small'>
                  <Icon path={mdiDownload} size={1} />
                </Button>
                {item.size}
              </ColorTypo>
            </div>
            <div>
              <ColorTypo variant='body1'>{item.date_create}</ColorTypo>
              <Button size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Icon path={mdiDotsHorizontal} size={1} ><a href={item.url} /></Icon>
              </Button>
            </div>
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
          </FileBoxStyledListItem>
        )
      })}
    </FileBoxStyledList>
    // </React.Fragment>
  );
  // }

  // return (
  //   <FileBoxStyledList>
  //     <CustomListItem />
  //     <CustomListItem />
  //     <CustomListItem />
  //   </FileBoxStyledList>
  // );
}

const FileContainer = (props) => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập từ khóa file' />
      <FileBox {...props} />
    </React.Fragment>
  );
}

const ListItemLink = styled(ListItem)`
  padding-left: 0;
  & > *:first-child {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #e4e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 23px;
  }
  & > div:nth-child(2) {
    word-break: break-word;
    width: 300px;
  }
`
const HeaderSubText = styled(ListSubheader)`
  font-size: 13px;
  color: #6e6d6d;
`
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;
const LinkBox = (props) => {
  // console.log("link::",);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <List subheader={<li />}>
      {props.link.map((item, idx) => {
        return (
          <div key={idx}>
            <HeaderSubText component='p' style={{ padding: 0, margin: 0 }}>{item.date_create}</HeaderSubText>
            {item.links.map((item, idx) => {
              return (
                <ListItemLink key={idx}>
                  <Typography component='div'>
                    <Icon path={mdiLink} size={1.4} color={'green'} />
                  </Typography>
                  <ListItemText>
                    <a 
                      href={item.url} 
                      target="_blank"
                      rel="noopener noreferrer">
                        {item.url}
                      </a>
                  </ListItemText>
                  <ListItemIcon>
                    <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                      <Icon path={mdiDotsHorizontal} size={1} />
                    </Button>
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
                </ListItemLink>
              )
            })}
          </div>
        )
      })}
    </List>
  );

  // return (
  //   <List subheader={<li />}>
  //     <HeaderSubText component='p' style={{ padding: 0, margin: 0 }}>09/09/2019</HeaderSubText>
  //     <CustomListItem />
  //     <CustomListItem />
  //     <CustomListItem />
  //   </List>
  // );
}

const LinkContainer = (props) => {
  return (
    <React.Fragment>
      <SearchInput fullWidth placeholder='Nhập từ khóa link' />
      <LinkBox {...props} />
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
          <MediaContainer {...props} />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          <FileContainer {...props} />
        </Collapse>
        <Collapse in={value === 2} mountOnEnter unmountOnExit>
          <LinkContainer {...props} />
        </Collapse>
      </Container>
    </Body>
  )
}

export default TabBody;
