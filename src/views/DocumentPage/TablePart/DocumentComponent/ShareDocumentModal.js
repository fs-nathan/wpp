import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar, CircularProgress } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { remove, findIndex } from 'lodash';
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
  actionFetchListMyDocument,
  actionSortListRecent,
  actionSortListProject,
  actionSortListDocumentFromMe,
  actionSortListDocumentShare,
  actionSortListDocument
} from '../../../../actions/documents/index';

let originListMember = [];
let memberIdShared = null;
const ShareDocumentModal = props => {
  const { t } = useTranslation();
  const { pathname } = props.location;
  const { item } = props;
  const [searchValue, setSearchValue] = useState('');
  const [listMember, setListMember] = useState([]);
  const [listMemberShared, setListMemberShared] = useState([]);
  const [itemSelected, setItemSelected] = useState(props.item);
  const [isLoading, setIsLoading] = useState(false);

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
      case Routes.DOCUMENT_RECENT: {
        const index = findIndex(props.listRecent, { id: itemSelected.id });
        const dataTemp = [...props.listRecent];
        dataTemp.splice(index, 1, itemSelected);
        props.actionSortListRecent(dataTemp);
        props.onClose();
        return null;
      }
      case Routes.DOCUMENT_PROJECT:
        if (!isProjectDocument) {
          const index = findIndex(props.listProject, { id: itemSelected.id });
          const dataTemp = [...props.listProject];
          dataTemp.splice(index, 1, itemSelected);
          props.actionSortListProject(dataTemp);
          props.onClose();
          return null;
        }
        break;
      case Routes.DOCUMENT_SHARE: {
        const index = findIndex(props.listDocumentFromMe, {
          id: itemSelected.id
        });
        const dataTemp = [...props.listDocumentFromMe];
        dataTemp.splice(index, 1, itemSelected);
        props.actionSortListDocumentFromMe(dataTemp);
        props.onClose();
        return null;
      }

      case Routes.DOCUMENT_SHARE_ME: {
        const index = findIndex(props.listDocumentShareToMe, {
          id: itemSelected.id
        });
        const dataTemp = [...props.listDocumentShareToMe];
        dataTemp.splice(index, 1, itemSelected);
        props.actionSortListDocumentShare(dataTemp);
        props.onClose();
        return null;
      }

      case Routes.DOCUMENT_ME: {
        const index = findIndex(props.listMyDocument, {
          id: itemSelected.id
        });
        const dataTemp = [...props.listMyDocument];
        dataTemp.splice(index, 1, itemSelected);
        props.actionSortListDocument(dataTemp);
        props.onClose();
        return null;
      }

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
      if (item.isGoogleDocument || item.document_type === 2) {
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

  const handleShareMember = async (member_id, member_name, member_avatar) => {
    try {
      console.log('test', item);
      setIsLoading(true);
      memberIdShared = member_id;
      if (item.isGoogleDocument || item.document_type === 2) {
        let data = {
          file_id: item.id,
          name: item.name,
          icon: item.iconLink,
          size: item.document_type === 2 ? item.size_number : item.size,
          url: item.document_type === 2 ? item.url : item.webViewLink,
          url_download:
            item.document_type === 2
              ? item.url_download
              : item.webContentLink || '',
          share_to: member_id,
          file_type: item.document_type === 2 ? item.type : item.fileExtension
        };
        await actionShareGoogleFile(data);
        setIsLoading(false);
      } else {
        let dataDTO = {};
        if (item.type === 'folder') {
          dataDTO.folder_id = item.id;
          dataDTO.member = member_id;
        } else {
          dataDTO.file_id = item.id;
          dataDTO.share_to = member_id;
        }
        const { data } = await actionShareFile(dataDTO, item.type);
        setIsLoading(false);
        if (data.state) {
          let itemSelectedTemp = itemSelected;
          itemSelectedTemp.users_shared.push({
            name: member_name,
            avatar: member_avatar,
            id: member_id
          });
          setItemSelected(itemSelectedTemp);
        }
      }
      fetDataForShare();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleCancelShareMember = async (
    member_id,
    member_name,
    member_avatar
  ) => {
    try {
      setIsLoading(true);
      memberIdShared = member_id;
      if (item.isGoogleDocument || item.document_type === 2) {
        await actionCancelShareGoogleFile({
          file_id: item.id,
          member_id: member_id
        });
        setIsLoading(false);
      } else {
        let dataDTO = {};
        if (item.type === 'folder') {
          dataDTO.folder_id = item.id;
          dataDTO.member_id = member_id;
        } else {
          dataDTO.file_id = item.id;
          dataDTO.member_id = member_id;
        }
        const { data } = await actionCancelShareFile(dataDTO, item.type);
        setIsLoading(false);
        if (data.state) {
          let itemSelectedTemp = itemSelected;
          remove(itemSelectedTemp.users_shared, { id: member_id });
          setItemSelected(itemSelectedTemp);
        }
      }
      fetDataForShare();
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <ModalCommon
      title={t('IDS_WP_SHARE_DOCUMENT')}
      onClose={() => {
        props.onClose();
        handleShare();
      }}
      type="share"
      footerAction={[
        { name: t('IDS_WP_EXIT'), action: handleShare, type: 'cancel' }
      ]}
      maxWidth="md"
    >
      <DialogContent dividers className="dialog-content share-doc">
        <div className="left-share-doc">
          <div className="title-left-share">
            <span className="text-title-left-share">
              {t('IDS_WP_MEMBER_LIST')}
            </span>
          </div>
          <div className="header-share-doc">
            <SearchInput
              placeholder={t('IDS_WP_INPUT_SEARCH')}
              value={searchValue}
              onChange={handleChangeSearch}
              style={{background: "#fff"}}
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
                        <div className="name-member" title={item.member_name}>
                          {item.member_name}
                        </div>
                        <div className="email-member" title={item.member_email}>
                          {item.member_email}
                        </div>
                      </div>
                    </div>
                    <div className="right-item">
                      <Button
                        variant="outlined"
                        className={`${
                          isLoading && memberIdShared === item.member_id
                            ? 'share-btn-disable'
                            : 'share-btn'
                        }`}
                        disabled={
                          isLoading && memberIdShared === item.member_id
                        }
                        onClick={() =>
                          handleShareMember(
                            item.member_id,
                            item.member_name,
                            item.member_avatar
                          )
                        }
                      >
                        {isLoading && memberIdShared === item.member_id && (
                          <CircularProgress
                            size={16}
                            className="margin-circular"
                            color="inherit"
                          />
                        )}
                        {t('IDS_WP_SHARE')}
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
              {t('IDS_WP_MEMBER_SHARED')}
            </span>
          </div>
          <div className="header-share-doc">
            <div className="left-content">
              <span className="text-title member-text">
                {t('IDS_WP_MEMBER')}
              </span>
            </div>
            <div className="right-content">
              <span className="text-title">{t('IDS_WP_DAY_SHARE')}</span>
              <span className="text-title">{t('IDS_WP_SHARE_BY_MEMBER')}</span>
              <span className="text-title opacity-0">
                {t('IDS_WP_SHARE_BY_MEMBER')}
              </span>
            </div>
          </div>
          <div className="list-member">
            <Scrollbars autoHide autoHideTimeout={500}>
              <StyledList>
                {listMemberShared.map(item => (
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
                        {item.is_owner ? (
                          <span className="info-left-item red-color">
                            {t('IDS_WP_OWNER')}
                          </span>
                        ) : (
                          <div className="info-left-item">
                            <div className="name-member">
                              {item.date_share || item.shared_at}
                            </div>
                            <span className="red-color">
                              {!item.is_in_group && t('IDS_WP_OUT_GROUP')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="right-item">
                        {!item.is_owner && (
                          <Avatar
                            src={`${item.user_share_avatar}`}
                            alt="avatar"
                            className="share-by-avatar"
                            title={item.user_share_name}
                          />
                        )}
                      </div>
                      <div className="right-item">
                        {!item.is_owner && (
                          <Button
                            variant="outlined"
                            className={`${
                              item.can_cancel_share
                                ? isLoading && memberIdShared === item.member_id
                                  ? 'share-btn-disable'
                                  : 'share-btn'
                                : 'share-btn-disable'
                            }`}
                            disabled={
                              !item.can_cancel_share ||
                              (isLoading && memberIdShared === item.member_id)
                            }
                            onClick={() =>
                              handleCancelShareMember(
                                item.member_id,
                                item.member_name,
                                item.member_avatar
                              )
                            }
                          >
                            {isLoading && memberIdShared === item.member_id && (
                              <CircularProgress
                                size={16}
                                className="margin-circular"
                                color="white"
                              />
                            )}
                            {t('IDS_WP_CANCEL')}
                          </Button>
                        )}
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

export default connect(
  state => ({
    listRecent: state.documents.listRecent,
    listProject: state.documents.listProject,
    listDocumentFromMe: state.documents.listDocumentFromMe,
    listDocumentShareToMe: state.documents.listDocumentShareToMe,
    listMyDocument: state.documents.listMyDocument
  }),
  {
    actionFetchListRecent,
    actionFetchListProjectOfFolder,
    actionFetchListDocumentFromMe,
    actionFetchListDocumentShare,
    actionFetchListMyDocument,
    actionSortListRecent,
    actionSortListProject,
    actionSortListDocumentFromMe,
    actionSortListDocumentShare,
    actionSortListDocument
  }
)(withRouter(ShareDocumentModal));
