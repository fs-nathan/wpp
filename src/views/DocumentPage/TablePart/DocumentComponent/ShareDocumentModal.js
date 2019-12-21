import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import SearchInput from '../../../../components/SearchInput';
import {
  actionGetMemberCanShare,
  actionGetMemberShared
} from '../../../../actions/documents/index';
const ShareDocumentModal = props => {
  const { pathname } = props.location;
  const [searchValue, setSearchValue] = useState('');
  const [listMember, setListMember] = useState([]);
  const [listMemberShared, setListMemberShared] = useState([]);
  const handleShare = () => {
    props.onOk();
  };
  const handleChangeSearch = e => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    fetDataForShare();
    // eslint-disable-next-line
  }, []);
  const fetDataForShare = async () => {
    const [data1, data2] = await Promise.all([
      actionGetMemberCanShare({
        file_id: props.item.id
      }),
      actionGetMemberShared({
        file_id: props.item.id
      })
    ]);
    setListMember(data1.data.members);
    setListMemberShared(data2.data.members);
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
          <div className="title-left-share">
            <span className="text-title-left-share">Danh sách thành viên</span>
          </div>
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
                  pathname === item.member_id ? 'item-actived' : ''
                }`}
              >
                <div className="left-item">
                  <Avatar
                    src={`https://storage.googleapis.com${item.member_avatar}`}
                    alt="avatar"
                    style={{ width: 35, height: 35, margin: 'auto' }}
                  />
                  <div className="info-left-item">
                    <div className="name-member">{item.member_name}</div>
                    <div>{item.member_name}</div>
                  </div>
                </div>
                <div className="right-item">
                  <Button variant="outlined">Chia sẻ</Button>
                </div>
              </StyledListItem>
            ))}
          </StyledList>
        </div>
        <div className="right-share-doc">
          <div className="title-left-share">
            <span className="text-title-left-share">
              Thành viên được chia sẻ
            </span>
          </div>
          <div className="header-share-doc">
            <div className="left-content">
              <span className="text-title">Thành Viên</span>
            </div>
            <div className="right-content">
              <span className="text-title">Ngày chia sẻ</span>
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
                    <Button variant="outlined">Hủy</Button>
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
