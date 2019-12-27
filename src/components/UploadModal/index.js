import React, { useEffect, useCallback, useState } from 'react';
import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { actionUploadFile } from '../../actions/documents';
import { isEmpty } from '../../helpers/utils/isEmpty';
import ColorTypo from '../ColorTypo';
import './UploadModal.scss';

const UploadModal = props => {
  const { open, setOpen, title, fileUpload = [], currentFolder } = props;
  const [percent, setPercent] = useState(0);
  const [currentUpload, setCurrentUpload] = useState({});
  const [totalSuccess, setTotalSuccess] = useState(0);

  const onUploading = percent => {
    setPercent(parseInt(percent));
  };

  useEffect(() => {
    if (fileUpload.length > 0) {
      let total = 0;
      async function onUploadFile() {
        for (let i = 0; i < fileUpload.length; i++) {
          setCurrentUpload(fileUpload[i]);
          const formData = new FormData();
          formData.append('file', fileUpload[i]);
          setPercent(0);
          if (!isEmpty(currentFolder)) {
            formData.append('folder_id', currentFolder.id);
          }
          try {
            await actionUploadFile(formData, onUploading);
            setTotalSuccess(++total);
          } catch (error) {
            setPercent(0);
          }
        }
        if (props.onCompleted) props.onCompleted();
      }
      onUploadFile();
      // }
    }
    // eslint-disable-next-line
  }, [fileUpload]);

  const formatBytes = useCallback((bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }, []);

  const handleClose = () => setOpen(false);
  if (!open) return null;
  return (
    <div className="upload-modal">
      <DialogTitle id="upload-dialog-title" className="upload-header">
        <ColorTypo className="header-title">
          {`${title || 'Tải tệp tin lên'} (${totalSuccess}/${
            fileUpload.length
          } hoàn thành)`}
        </ColorTypo>
        <div className="right-action">
          <Button className="btn-cancel" onClick={handleClose}>
            Hủy
          </Button>
          <IconButton onClick={handleClose}>
            <Icon path={mdiClose} size={1} color="#fff" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className="upload-content">
        <div className="upload-info">
          <span className="file-name">{currentUpload.name}</span>
          <span className="file-size">({formatBytes(currentUpload.size)})</span>
        </div>
        <div className="progress-content">
          <LinearProgress
            className="progress-bar"
            variant="determinate"
            value={percent}
          />
          <span className="percent-upload">{percent}%</span>
        </div>
      </DialogContent>
    </div>
  );
};

export default connect(
  state => ({
    currentFolder: state.documents.currentFolder
  }),
  {}
)(UploadModal);
