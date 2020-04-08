import { Button } from '@material-ui/core';
import { appendChat, chatFile, onUploading } from 'actions/chat/chat';
import { file as file_icon } from 'assets/fileType';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../../components/CustomModal';
import DocumentFileModal from './DocumentFileModal';
import './SendFileModal.scss';

function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  // : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

const SendFileModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [visibleDocumentFile, setVisibleDocumentFile] = useState(false);

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
    const data_chat = {
      type: CHAT_TYPE.UPLOADING_FILE, files: images,
      isUploading: true,
      is_me: true,
    }
    dispatch(appendChat({ data_chat }));
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i], files[i].name)
    }
    dispatch(chatFile(taskId, data, onUploadingHandler));
    setOpen(false)
  };

  function onClickShareDoc() {
    setVisibleDocumentFile(true)
  }

  function onCloseShareDoc() {
    setVisibleDocumentFile(false)
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      height="mini"
      title="Chọn tài liệu"
      className="send-file-modal"
      confirmRender={null}
      cancleRender={() => 'Thoát'}
    >
      <div className="send-file-content">
        <div className="btn-upload">
          <input
            className="display-none"
            id="upload_file"
            multiple
            type="file"
            onChange={handleUploadFile}
          />
          <label htmlFor="upload_file">
            <Button variant="outlined" component="span">
              Tải file từ máy tính
            </Button>
          </label>
        </div>
        <div className="btn-upload">
          <Button
            variant="outlined"
            onClick={onClickShareDoc}
          >
            Chọn từ thư viện
          </Button>
        </div>
        {visibleDocumentFile && (
          <DocumentFileModal
            open={visibleDocumentFile}
            setOpen={onCloseShareDoc}
          />
        )}
      </div>
    </CustomModal>
  );
};

export default SendFileModal;
