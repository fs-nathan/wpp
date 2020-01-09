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


// const Container = styled.div`
//   padding: 20px;
// `;

const SubHeader = styled(ListSubheader)`
  padding: 0;
  font-size: 14px;
`
const ImageMedia = styled(GridListTile)`
  margin-right: 7px;
`

// const Image = styled.img`
//   height: 80px;
//   width: 80px;
//   margin: 0;
//   padding: 0;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7
//   }
// `
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
// const MediaImage = styled.div`
//   width: auto !important;
//   height: auto !important;
// `
// const WrapImage = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `

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
  return (
    <GridList cellHeight={60} cols={5} style={{ display: "inline-block" }}>
      {props.image.images && props.image.images.map((image, key) => {
        return (
          <div className="media-image" key={key}>
            <GridListTile cols={5}>
              <SubHeader component='div'>{image.date_create}</SubHeader>
            </GridListTile>
            <div className="wrap-image">
              {image.images.map((item, idx) => {
                return (
                  <ImageMedia key={idx}>
                    <img src={item.url} alt='avatar' className="image-media-box" />
                    <MenuListItem />
                  </ImageMedia>
                )
              })}
            </div>
          </div>
        );
      })}
    </GridList>
  );
}

const MediaContainer = (props) => {
  const searchImagesTabPart = (e) => {
    props.searchImages(e.target.value)
  }
  return (
    <React.Fragment>
      <SearchInput 
        fullWidth
        placeholder='Nhập ngày đăng...'
        onChange={e => searchImagesTabPart(e)}
      />
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
  &:hover .styled-menu-file {
    opacity: 1;
  }
`;
// const FileName = styled.div`
//   width: 300px;
//   word-break: break-word;
// `
// const StyledMenuFile = styled.div`
//   opacity: 0 ;
//   ${FileBoxStyledListItem}:hover & {
//     opacity: 1;
//   }
// `

const FileBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <FileBoxStyledList>
      {props.file.files && props.file.files.map((item, idx) => {
        return (

          <FileBoxStyledListItem key={idx}>
            <img src={iconDoc} alt='avatar' />
            <div>
              <div className="file-name">{item.name}</div>
              <ColorTypo variant='caption'>
                <Button size='small'>
                  <a href={item.url}>
                    <Icon path={mdiDownload} size={1} />
                  </a>
                </Button>
                {item.size}
              </ColorTypo>
            </div>
            <div>
              <ColorTypo variant='body1'>{item.date_create}</ColorTypo>
              <div className="styled-menu-file">

                <Button size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                  <Icon path={mdiDotsHorizontal} size={1} ></Icon>
                </Button>
              </div>
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
  );
}

const FileContainer = (props) => {
  const searchFileTabPart = (e) => {
    props.searchFile(e.target.value)
  }
  return (
    <React.Fragment>
      <SearchInput 
        fullWidth 
        placeholder='Nhập từ khóa file'
        onChange={e => searchFileTabPart(e)}
      />
      <FileBox {...props} />
    </React.Fragment>
  );
}

const ListItemLink = styled(ListItem)`
  padding-left: 0;
  & > *:first-child {
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
// const StyledListItemLink = styled.div``
// const StyledMenuLink = styled.div`
//   opacity: 0 ;
//   ${StyledListItemLink}:hover & {
//     opacity: 1;
//   }
// `
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
      {props.link.links && props.link.links.map((item, idx) => {
        return (
          <div className="styled-list-item-link" key={idx}>
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
                  <div className="styled-menu-link">
                    <ListItemIcon>
                      <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                        <Icon path={mdiDotsHorizontal} size={1} />
                      </Button>
                    </ListItemIcon>
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
                </ListItemLink>
              )
            })}
          </div>
        )
      })}
    </List>
  );

}

const LinkContainer = (props) => {
  const searchLinkTabPart = (e) => {
    props.searchLink(e.target.value)
  }
  return (
    <React.Fragment>
      <SearchInput 
        fullWidth 
        placeholder='Nhập từ khóa link'
        onChange={e => searchLinkTabPart(e)}
      />
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
      <div className="container-media-tabbody">
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
      </div>
    </Body>
  )
}

export default TabBody;
