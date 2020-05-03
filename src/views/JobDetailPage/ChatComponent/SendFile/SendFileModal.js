import { mdiCloudUpload, mdiLaptop } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, chatFile, onUploading } from 'actions/chat/chat';
import { file as file_icon } from 'assets/fileType';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import { humanFileSize } from 'helpers/jobDetail/stringHelper';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../../components/CustomModal';
import './SendFileModal.scss';

const SendFileModal = ({ open, setOpen, onClickShareFromLibrary }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileInputRef = useRef()
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const userId = useSelector(state => state.system.profile.id)

  function onUploadingHandler(percent) {
    dispatch(onUploading(percent));
  }

  const handleUploadFile = async e => {
    const { files } = e.target;
    // console.log('upload file', files);
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await getFileUrl(file)
      images.push({
        url, name: file.name, file_icon,
        size: humanFileSize(file.size)
      })
    }
    const id = Date.now();
    const data_chat = {
      id,
      type: CHAT_TYPE.UPLOADING_FILE, files: images,
      isUploading: true,
      user_create_id: userId,
      is_me: true,
    }
    dispatch(appendChat({ data_chat }));
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i], files[i].name)
    }
    dispatch(chatFile(taskId, data, onUploadingHandler, id));
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
