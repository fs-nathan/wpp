import { Button } from '@material-ui/core';
import { chatFile } from 'actions/chat/chat';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../../components/CustomModal';
import DocumentFileModal from './DocumentFileModal';
import './SendFileModal.scss';

const SendFileModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [visibleDocumentFile, setVisibleDocumentFile] = useState(false);

  const handleUploadFile = e => {
    const { files } = e.target;
    console.log('upload file', files);
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i], files[i].name)
    }
    dispatch(chatFile(taskId, data))
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
