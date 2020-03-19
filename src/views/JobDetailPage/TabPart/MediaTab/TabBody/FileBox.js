import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  List, ListItem,
  IconButton, Menu, MenuItem,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDownload, mdiDotsHorizontal, } from '@mdi/js';

import ColorTypo from '../../../../../components/ColorTypo';
import iconDoc from '../../../../../assets/doc.png';

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

export const Button = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

const FileBox = (props) => {
  const file = useSelector(state => state.taskDetail.media.file);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <FileBoxStyledList>
      {file.files && file.files.map((item, idx) => {
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

export default FileBox