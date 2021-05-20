import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose, mdiAlert } from '@mdi/js';
import { actionUploadFile } from '../../actions/documents';
import { isEmpty } from '../../helpers/utils/isEmpty';
import ColorTypo from '../ColorTypo';
import './UploadModal.scss';
import OutOfStorageDialog from 'views/JobDetailPage/ChatComponent/OutOfStorageDialog';

const UploadModal = props => {
  const { t } = useTranslation();
  const { open, setOpen, title, fileUpload = [], currentFolder } = props;
  const [percent, setPercent] = useState(0);
  const [currentUpload, setCurrentUpload] = useState({});
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [errorSize, setErrorSize] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorMaxFile, setErrorMaxFile] = useState(false);
  const [errorLimit, setErrorLimit] = useState(false)
  const onUploading = percent => {
    setPercent(parseInt(percent));
  };

  const checkFilesSize = (files = []) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size / 1024 / 1024 > 50) return false;
    }
    return true;
  };

  const checkValidFilesName = (files = []) => {
    for (let i = 0; i < files.length; i++) {
      let fileName = files[i].name || '';
      if (
        fileName.indexOf('@') > -1 ||
        fileName.indexOf('#') > -1 ||
        fileName.indexOf('$') > -1 ||
        fileName.indexOf('&') > -1 ||
        fileName.indexOf('*') > -1 ||
        fileName.indexOf('?') > -1 ||
        fileName.indexOf('%') > -1 ||
        fileName.indexOf('!') > -1
      )
        return false;
    }
    return true;
  };

  useEffect(() => {
    if (fileUpload.length > 0) {
      if (fileUpload.length > 20) {
        setErrorMaxFile(true);
        return;
      }
      if (!checkFilesSize(fileUpload)) {
        setErrorSize(true);
        return;
      }
      if (!checkValidFilesName(fileUpload)) {
        setErrorName(true);
        return;
      }
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
            if(error.message === 'limit_group_size'){
              setErrorLimit(true)
            }
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
  if(errorLimit){
    return <OutOfStorageDialog isOpen={errorLimit} setOpen={setErrorLimit}/>
  }
  const handleClose = () => setOpen(false);
  if (!open) return null;
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <div className="upload-modal">
      <DialogTitle
        id="upload-dialog-title"
        className="upload-header"
        style={{ background: bgColor.color }}
      >
        <ColorTypo className="header-title">
          {`${title || t('IDS_WP_UPLOAD_FILE_UP')} (${totalSuccess}/${
            fileUpload.length
          } ${t('IDS_WP_SUCCESS')})`}
        </ColorTypo>
        <div className="right-action">
          <Button className="btn-cancel" onClick={handleClose}>
            {t('IDS_WP_CANCEL')}
          </Button>
          <IconButton onClick={handleClose}>
            <Icon path={mdiClose} size={1} color="#fff" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className="upload-content">
        {(errorSize || errorName || errorMaxFile) && (
          <div className="error-content">
            <Icon
              className="ic-alert"
              path={mdiAlert}
              size={2.5}
              color={'red'}
            />
            {errorSize && (
              <div className="error-msg">
                {t('IDS_WP_UPLOAD_OVER_LIMIT')}
                <span>(50mb/{t('IDS_WP_FILE')})</span>
              </div>
            )}
            {errorName && (
              <div className="error-msg">
                {t('IDS_WP_NAME_CONTAIN_SPECIAL_CHAR')}
                <span className="err-name">({'@, #, $, &, *, ?, %, !'})</span>
              </div>
            )}
            {errorMaxFile && (
              <div className="error-msg">
                {t('IDS_WP_UPLOAD_OVER_LIMIT_DES')}
              </div>
            )}
          </div>
        )}
        {!errorSize && !errorName && !errorMaxFile && (
          <React.Fragment>
            <div className="upload-info">
              <span className="file-name">{currentUpload.name}</span>
              <span className="file-size">
                ({formatBytes(currentUpload.size)})
              </span>
            </div>
            <div className="progress-content">
              <LinearProgress
                className="progress-bar"
                variant="determinate"
                value={percent}
              />
              <span className="percent-upload">{percent}%</span>
            </div>
          </React.Fragment>
        )}

      </DialogContent>
    </div>
  );
};

export default connect(
  state => ({
    currentFolder: state.documents.currentFolder,
    colors: state.setting.colors
  }),
  {}
)(UploadModal);
