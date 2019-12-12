import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { Avatar } from '@material-ui/core';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import SearchInput from '../../../../components/SearchInput';
const listMember = [
  {
    id: 0,
    name: 'Cao Văn Hưng',
    email: 'hungcv@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg'
  },
  {
    id: 1,
    name: 'Hồ Trọng Văn',
    email: 'vanht@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg'
  },
  {
    id: 2,
    name: 'Trần Quốc Huy',
    email: 'huytq@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg'
  },
  {
    id: 3,
    name: 'Cao Văn Hưng',
    email: 'hungcv@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg'
  },
  {
    id: 4,
    name: 'Hồ Trọng Văn',
    email: 'vanht@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg'
  }
];
const listMemberShared = [
  {
    id: 0,
    name: 'Cao Văn Hưng',
    email: 'hungcv@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg',
    date: '12/12/2019'
  },
  {
    id: 1,
    name: 'Hồ Trọng Văn',
    email: 'vanht@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg',
    date: '12/12/2019'
  },
  {
    id: 2,
    name: 'Trần Quốc Huy',
    email: 'huytq@gmai.com',
    icon: '/static/media/avatar.a16a011e.jpg',
    date: '12/12/2019'
  }
];
const ShareDocumentModal = props => {
  const { pathname } = props.location;
  const [searchValue, setSearchValue] = useState('');
  const handleShare = () => {
    props.onOk();
  };
  const handleChangeSearch = e => {
    setSearchValue(e.target.value);
  };
  return (
    <ModalCommon
      title="Chia sẻ tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Hoàn thành', action: handleShare }]}
      maxWidth="lg"
    >
      <DialogContent dividers className="dialog-content share-doc">
        <div className="left-share-doc">
          <div className="header-share-doc">
            <SearchInput
              placeholder="Nhập nội dung cần tìm"
              value={searchValue}
              onChange={handleChangeSearch}
            />
          </div>

          <StyledList>
            {listMember.map((item, index) => (
              <StyledListItem
                key={item.id}
                className={`item-member ${
                  pathname === item.id ? 'item-actived' : ''
                }`}
              >
                <div className="left-item">
                  <Avatar
                    src={item.icon}
                    alt="avatar"
                    style={{ width: 35, height: 35, margin: 'auto' }}
                  />
                  <div className="info-left-item">
                    <div className="name-member">{item.name}</div>
                    <div>{item.email}</div>
                  </div>
                </div>
                <div className="right-item">
                  <Fab variant="extended" className="btn-share">
                    Chia sẻ
                  </Fab>
                </div>
              </StyledListItem>
            ))}
          </StyledList>
        </div>
        <div className="right-share-doc">
          <div className="header-share-doc">
            <div className="left-content">
              <span>Thành Viên</span>
            </div>
            <div className="right-content">
              <span>Ngày chia sẻ</span>
            </div>
          </div>
          <StyledList>
            {listMemberShared.map((item, index) => (
              <StyledListItem
                key={item.id}
                className={`item-member ${
                  pathname === item.id ? 'item-actived' : ''
                }`}
              >
                <div className="left-content">
                  <div className="left-item">
                    <Avatar
                      src={item.icon}
                      alt="avatar"
                      style={{ width: 35, height: 35, margin: 'auto' }}
                    />
                    <div className="info-left-item">
                      <div className="name-member">{item.name}</div>
                      <div>{item.email}</div>
                    </div>
                  </div>
                </div>
                <div className="right-content">
                  <div>
                    <span>{item.date}</span>
                  </div>
                  <div className="right-item">
                    <Fab variant="extended" className="btn-share">
                      Hủy
                    </Fab>
                  </div>
                </div>
              </StyledListItem>
            ))}
          </StyledList>
        </div>
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(ShareDocumentModal);
