import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import avatar from '../../../../assets/avatar.jpg';
import { Icon } from "@mdi/react";
import {
  mdiDotsVertical,
  mdiBullhornOutline,
  mdiArrowRight,
  mdiCommentProcessingOutline,
} from "@mdi/js";
import ColorTypo from '../../../../components/ColorTypo';
import ColorBadge from '../../../../components/ColorBadge';
import AvatarCircleList from '../../../../components/AvatarCircleList';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Content = styled.div`
  margin-left: 10px;
  flex-grow: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: baseline;
  & > * {
    font-size: 12px;
  }
  & > p {
    margin: 0;
  }
  & > *:not(:last-child) {
    margin-right: .5rem;
  }
`;

const RightHeader = styled(IconButton)`
  margin-left: auto;
`;

const Body = styled(ColorTypo)`
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentOverview = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  & > span:last-child {
    margin-left: 15px;
  }
`;

const Detail = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  text-decoration: none;
  color: #007bff;
  & > *:last-child {
    margin-left: 3px;
  }
`;

function NewsItem() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Container>
        <Avatar src={avatar} alt='avatar' />
        <Content>
          <Header>
            <div>
              <ColorTypo bold>Nguyễn Hữu Thành</ColorTypo>
              <Subtitle>
                <Icon path={mdiBullhornOutline} size={0.7} color="rgb(231, 153, 7)" /> 
                <p>Đã ghim thông báo mức độ</p> 
                <ColorTypo color='orange' variant='subtitle1'>Quan trọng</ColorTypo> 
                <p>2 tháng trước</p>
              </Subtitle>
            </div>
            <RightHeader size='small' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Icon path={mdiDotsVertical} size={1} />
            </RightHeader>
          </Header>
          <Body>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo quos ducimus tempora temporibus sit commodi pariatur iusto sapiente dolorem eaque.
          </Body>
          <Footer>
            <AvatarCircleList total={15} display={4} />
            <CommentOverview>
              <ColorBadge variantColor='red' badgeContent={30} max={9}>
                <Icon path={mdiCommentProcessingOutline} size={1} />
              </ColorBadge>
              <span>30 phản hồi</span>
            </CommentOverview>
            <Detail to='/'>
              <span>Chi tiết</span>
              <Icon path={mdiArrowRight} size={0.7} color={'#007bff'} />
            </Detail>
          </Footer>
        </Content>
      </Container>
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
        <MenuItem onClick={handleClose}>Bỏ ghim</MenuItem>
        <MenuItem onClick={handleClose}>Ghim đầu bảng</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default NewsItem;
