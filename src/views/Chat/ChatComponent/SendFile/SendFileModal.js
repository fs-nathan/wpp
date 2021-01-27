import { mdiCloudUpload, mdiLaptop } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ShareFromLibraryModal from 'views/JobDetailPage/ChatComponent/ShareFromLibraryModal';
import CustomModal from '../../../../components/CustomModal';
import OutOfStorageDialog from '../OutOfStorageDialog';
import './SendFileModal.scss';

const SendFileModal = ({ open, setOpen, onConfirmShare, handleUploadFile }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef()
  const error = useSelector(state => state.chat.error);
  const [isShareFromLib, setShareFromLib] = useState(false);

  function onClickFromComputer() {
    document.getElementById('upload_file').value= null
    fileInputRef.current.click()
  }

  function onClickShareFromLibrary() {
    setOpen(false)
    setShareFromLib(true)
  }

  function onChangeFile(evt) {
    setOpen(false)
    handleUploadFile(evt)
  }

  function onClickConfirmShare(evt) {
    setShareFromLib(false)
    onConfirmShare(evt)
  }

  return (
    <>
      <CustomModal
        open={open}
        setOpen={setOpen}
        height="mini"
        title={t('LABEL_CHAT_TASK_CHON_TAI_LIEU')}
        className="send-file-modal"
        confirmRender={null}
        cancleRender={() => t('LABEL_CHAT_TASK_THOAT')}
      >
        <div className="send-file-content">
          <div className="SendFileModal--button" onClick={onClickFromComputer}>
            <input
              className="display-none"
              id="upload_file"
              multiple
              type="file"
              onChange={onChangeFile}
              ref={fileInputRef}
            />
            <Icon path={mdiLaptop} size={2} color="#ff5722"></Icon>
            <div className="SendFileModal--rightButton">
              <div className="SendFileModal--title">{t('LABEL_CHAT_TASK_TAI_TAI_LIEU_TU_MAY_TINH')}</div>
              <div className="SendFileModal--description">{t('LABEL_CHAT_TASK_TAI_LIEU_MOI_TU')}</div>
            </div>
          </div>
          <div className="SendFileModal--button"
            onClick={onClickShareFromLibrary}
          >
            <Icon path={mdiCloudUpload} size={2} color="#2196f3"></Icon>
            <div className="SendFileModal--rightButton">
              <div className="SendFileModal--title">{t('LABEL_CHAT_TASK_CHON_TAI_LIEU_TU_KHO_LUU_TRU')}</div>
              <div className="SendFileModal--description">{t('LABEL_CHAT_TASK_SU_DUNG_TAI_LIEU')}</div>
            </div>
          </div>
        </div>
      </CustomModal>
      {(error === 'limit_group_size') ?
        <OutOfStorageDialog isOpen={error === 'limit_group_size'} setOpen={setShareFromLib} />
        :
        <ShareFromLibraryModal
          open={isShareFromLib}
          setOpen={setShareFromLib}
          onClickConfirm={onClickConfirmShare}
        />
      }
    </>
  );
};

export default SendFileModal;
