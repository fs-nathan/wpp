import React, { useEffect, useCallback, useState } from 'react';
import {
  Button,
  Dialog,
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
  const { open, setOpen, title, fileUpload, currentFolder } = props;
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState(false);

  const onUploading = percent => {
    setPercent(parseInt(percent));
  };

  useEffect(() => {
    if (fileUpload) {
      for (let i = 0; i < fileUpload.length; i++) {
        async function onUploadFile() {
          const formData = new FormData();
          formData.append('file', fileUpload[i]);
          if (!isEmpty(currentFolder)) {
            formData.append('folder_id', currentFolder.id);
          }
          try {
            await actionUploadFile(formData, onUploading);
          } catch (error) {
            setError(true);
            setPercent(0);
          }
        }
        onUploadFile(fileUpload[i]);
      }
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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick
      fullWidth
      maxWidth="xs"
      aria-labelledby="upload-dialog-title"
      className="upload-modal"
    >
      <DialogTitle id="upload-dialog-title" className="upload-header">
        <ColorTypo className="header-title">
          {title || 'Tải tệp tin lên'}
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
          <span className="file-name">{fileUpload[0].name}</span>
          <span className="file-size">({formatBytes(fileUpload[0].size)})</span>
        </div>
        <div className="progress-content">
          <LinearProgress
            className="progress-bar"
            variant="determinate"
            value={percent}
          />
          <span className="percent-upload">{percent}%</span>
        </div>
        {error && <div className="err-msg">Tải tài liệu lên thất bại!</div>}
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  state => ({
    currentFolder: state.documents.currentFolder
  }),
  {}
)(UploadModal);
