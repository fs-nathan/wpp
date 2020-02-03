import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import SearchInput from '../../../../components/SearchInput';
import { Routes } from '../../../../constants/routes';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import {
  actionGetMemberCanShare,
  actionGetMemberShared,
  actionShareFile,
  actionCancelShareFile,
  getMemberShareGoogleFile,
  getMemberSharedGoogleFile,
  actionShareGoogleFile,
  actionCancelShareGoogleFile,
  actionFetchListRecent,
  actionFetchListProjectOfFolder,
  actionFetchListDocumentFromMe,
  actionFetchListDocumentShare,
  actionFetchListMyDocument
} from '../../../../actions/documents/index';

let originListMember = [];
const ShareDocumentModal = props => {
  const { pathname } = props.location;
  const { item } = props;
  const [searchValue, setSearchValue] = useState('');
  const [listMember, setListMember] = useState([]);
  const [listMemberShared, setListMemberShared] = useState([]);

  useEffect(() => {
    return () => {
      originListMember = [];
    };
  }, []);

  const handleFilterData = seachText => {
    if (!seachText) {
      setListMember(originListMember);
    } else {
      const listTemp = originListMember.filter(item => {
        return (
          (item.member_name &&
            item.member_name.toLowerCase().indexOf(seachText.toLowerCase()) >
              -1) ||
          (item.member_email &&
            item.member_email.toLowerCase().indexOf(seachText.toLowerCase()) >
              -1)
        );
      });
      setListMember(listTemp);
    }
  };

  const handleShare = () => {
    const pathname = props.history.location.pathname;
    const isProjectDocument = isEmpty(props.location.search);
    switch (pathname) {
      case Routes.DOCUMENT_RECENT:
        props.actionFetchListRecent({}, false);
        props.onClose();
        return null;
      case Routes.DOCUMENT_PROJECT:
        if (!isProjectDocument) {
          const search = props.location.search.split('projectId=').pop();
          props.actionFetchListProjectOfFolder({ project_id: search }, false);
          props.onClose();
          return null;
        }
        break;
      case Routes.DOCUMENT_SHARE:
        props.actionFetchListDocumentFromMe({}, false);
        props.onClose();
        return null;

      case Routes.DOCUMENT_SHARE_ME:
        props.actionFetchListDocumentShare({}, false);
        props.onClose();
        return null;

      case Routes.DOCUMENT_ME:
        props.actionFetchListMyDocument({}, false);
        props.onClose();
        return null;

      default: {
        props.onClose();
        return null;
      }
    }
  };

  const handleChangeSearch = e => {
    setSearchValue(e.target.value);
    handleFilterData(e.target.value);
  };

  useEffect(() => {
    fetDataForShare();
    // eslint-disable-next-line
  }, []);

  const fetDataForShare = async () => {
    try {
      if (item.isGoogleDocument) {
        const [data1, data2] = await Promise.all([
          getMemberShareGoogleFile({ file_id: item.id }),
          getMemberSharedGoogleFile({ file_id: item.id })
        ]);
        setListMember(data1.data.members);
        setListMemberShared(data2.data.members);
        originListMember = data1.data.members;
      } else {
        let params = {};
        if (item.type === 'folder') {
          params.folder_id = item.id;
        } else {
          params.file_id = item.id;
        }
        const [data1, data2] = await Promise.all([
          actionGetMemberCanShare(params, item.type),
          actionGetMemberShared(params, item.type)
        ]);
        setListMember(data1.data.members);
        setListMemberShared(data2.data.members);
        originListMember = data1.data.members;
      }
      if (searchValue) {
        handleFilterData(searchValue);
      }
    } catch (error) {}
  };

  const handleShareMember = async member_id => {
    try {
      if (item.isGoogleDocument) {
        let data = {
          file_id: item.id,
          name: item.name,
          icon: item.iconLink,
          size: item.size,
          url: item.webViewLink,
          share_to: member_id,
          file_type: item.fileExtension
        };
        await actionShareGoogleFile(data);
      } else {
        let data = {};
        if (item.type === 'folder') {
          data.folder_id = item.id;
          data.member = member_id;
        } else {
          data.file_id = item.id;
          data.share_to = member_id;
        }
        await actionShareFile(data, item.type);
      }
      fetDataForShare();
    } catch (error) {}
  };

  const handleCancelShareMember = async member_id => {
    try {
      if (item.isGoogleDocument) {
        await actionCancelShareGoogleFile({
          file_id: item.id,
          member_id: member_id
        });
      } else {
        let data = {};
        if (item.type === 'folder') {
          data.folder_id = item.id;
          data.member_id = member_id;
        } else {
          data.file_id = item.id;
          data.member_id = member_id;
        }
        await actionCancelShareFile(data, item.type);
      }
      fetDataForShare();
    } catch (error) {}
  };

  return (
    <ModalCommon
      title="Chia sẻ tài liệu"
      footerAction={[{ name: 'Thoát', action: handleShare, type: 'cancel' }]}
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
          <div className="list-member">
            <Scrollbars autoHide autoHideTimeout={500}>
              <StyledList>
                {listMember.map((item, index) => (
                  <StyledListItem
                    key={item.member_id}
                    className={`item-member ${
                      pathname === item.member_id ? 'item-actived' : ''
                    }`}
                  >
                    <div className="left-item">
                      {item.member_avatar && (
                        <Avatar
                          src={item.member_avatar}
                          alt="avatar"
                          style={{ width: 35, height: 35, margin: 'auto' }}
                        />
                      )}
                      <div className="info-left-item">
                        <div className="name-member">{item.member_name}</div>
                        <div className="email-member">{item.member_email}</div>
                      </div>
                    </div>
                    <div className="right-item">
                      <Button
                        variant="outlined"
                        className="share-btn"
                        onClick={() => handleShareMember(item.member_id)}
                      >
                        Chia sẻ
                      </Button>
                    </div>
                  </StyledListItem>
                ))}
              </StyledList>
            </Scrollbars>
          </div>
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
          <div className="list-member">
            <Scrollbars autoHide autoHideTimeout={500}>
              <StyledList>
                {listMemberShared.map((item, index) => (
                  <StyledListItem
                    key={item.member_id}
                    className={`item-member ${
                      pathname === item.member_id ? 'item-actived' : ''
                    }`}
                  >
                    <div className="left-content">
                      <div className="left-item">
                        <Avatar
                          src={`${item.member_avatar}`}
                          alt="avatar"
                          style={{ width: 35, height: 35, margin: 'auto' }}
                        />
                        <div className="info-left-item">
                          <div className="name-member">{item.member_name}</div>
                          <div className="email-member">
                            {item.member_email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right-content">
                      <div>
                        <span>{item.date_share}</span>
                      </div>
                      <div className="right-item">
                        <Button
                          variant="outlined"
                          className="share-btn"
                          onClick={() =>
                            handleCancelShareMember(item.member_id)
                          }
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </StyledListItem>
                ))}
              </StyledList>
            </Scrollbars>
          </div>
        </div>
      </DialogContent>
    </ModalCommon>
  );
};

export default connect(state => ({}), {
  actionFetchListRecent,
  actionFetchListProjectOfFolder,
  actionFetchListDocumentFromMe,
  actionFetchListDocumentShare,
  actionFetchListMyDocument
})(withRouter(ShareDocumentModal));
