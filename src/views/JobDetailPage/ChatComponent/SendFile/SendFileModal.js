import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import DocumentFileModal from './DocumentFileModal';
import './SendFileModal.scss';

const SendFileModal = ({ open, setOpen }) => {
  const [visibleDocumentFile, setVisibleDocumentFile] = useState(false);

  const handleUploadFile = e => {
    const { files } = e.target;
    console.log('upload file', files);
  };

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
            onClick={() => setVisibleDocumentFile(true)}
          >
            Chọn từ thư viện
          </Button>
        </div>
        {visibleDocumentFile && (
          <DocumentFileModal
            open={visibleDocumentFile}
            setOpen={() => setVisibleDocumentFile(false)}
          />
        )}
      </div>
    </CustomModal>
  );
};

export default SendFileModal;
