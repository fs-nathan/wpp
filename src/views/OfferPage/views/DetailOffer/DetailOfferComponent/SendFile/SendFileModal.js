import { mdiCloudUpload, mdiLaptop } from '@mdi/js';
import Icon from '@mdi/react';
import CustomModal from 'components/CustomModal';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocumentOffer } from 'views/OfferPage/redux/actions';
import './SendFileModal.scss';

const SendFileModal = ({ offer_id, open, setOpen, onClickShareFromLibrary }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileInputRef = useRef()
  const userId = useSelector(state => state.system.profile.id)

  const handleUploadFile = async e => {
    const { files } = e.target;
    const formData = new FormData()
    formData.append("offer_id", offer_id)
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i])
    }
    dispatch(uploadDocumentOffer({ data: formData }))
    setOpen(false)
  };

  function onClickFromComputer() {
    fileInputRef.current.click()
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      height="mini"
      title={t('LABEL_CHAT_TASK_CHON_TAI_LIEU')}
      className="send-file-modal"
      confirmRender={null}
      cancleRender={() => 'Thoát'}
    >
      <div className="send-file-content">
        <div className="SendFileModal--button" onClick={onClickFromComputer}>
          <input
            className="display-none"
            id="upload_file"
            multiple
            type="file"
            onChange={handleUploadFile}
            ref={fileInputRef}
          />
          <Icon path={mdiLaptop} size={2}></Icon>
          <div className="SendFileModal--rightButton">
            <div className="SendFileModal--title">{t('LABEL_CHAT_TASK_TAI_TAI_LIEU_TU_MAY_TINH')}</div>
            <div className="SendFileModal--description">{t('LABEL_CHAT_TASK_TAI_LIEU_MOI_TU')}</div>
          </div>
        </div>
        <div className="SendFileModal--button"
          onClick={onClickShareFromLibrary}
        >
          <Icon path={mdiCloudUpload} size={2}></Icon>
          <div className="SendFileModal--rightButton">
            <div className="SendFileModal--title">{t('LABEL_CHAT_TASK_CHON_TAI_LIEU_TU_KHO_LUU_TRU')}</div>
            <div className="SendFileModal--description">{t('LABEL_CHAT_TASK_SU_DUNG_TAI_LIEU')}</div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default SendFileModal;
