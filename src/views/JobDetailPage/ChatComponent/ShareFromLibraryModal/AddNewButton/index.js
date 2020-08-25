// import { Scrollbars } from 'react-custom-scrollbars';
import { DialogContent, Menu, MenuItem, TextField } from '@material-ui/core';
import { mdiFileUploadOutline, mdiFolderPlusOutline, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { actionCreateFolder, actionFetchListMyDocument } from 'actions/documents';
import TitleSectionModal from 'components/TitleSectionModal';
import UploadModal from 'components/UploadModal';
import { isEmpty } from 'helpers/utils/isEmpty';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ModalCommon from 'views/DocumentPage/TablePart/DocumentComponent/ModalCommon';
import { StyledButton } from 'views/DocumentPage/TablePart/DocumentComponent/TableCommon';
import './styles.scss';

function AddNewButton({ selectedMenu }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const breadCrumbs = useSelector(state => state.system.breadCrumbs);
  const currentFolder = useSelector(state => state.documents.currentFolder);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateFolder, setCreateFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [showInputFile, setShowInputFile] = useState(true);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleUploadFile = e => {
    const { files } = e.target;
    if (files) {
      setFileUpload(files);
      setVisibleUploadModal(true);
    }

    // reset input file
    setShowInputFile(false);
    setTimeout(() => {
      setShowInputFile(true);
    }, 0);
  };

  const handleCreateFolder = async () => {
    try {
      setLoading(true);
      await actionCreateFolder({
        name: nameFolder,
        parent_id: currentFolder.id
      });
      if (isEmpty(breadCrumbs)) {
        dispatch(actionFetchListMyDocument({}, true));
      } else {
        dispatch(actionFetchListMyDocument(
          { folder_id: breadCrumbs[breadCrumbs.length - 1].id },
          true
        ));
      }
      setCreateFolder(false);
      setLoading(false);
      setNameFolder('');
    } catch (error) {
      setCreateFolder(false);
      setLoading(false);
      setNameFolder('');
    }
  };
  const listAction = [
    {
      text: t('IDS_WP_CREATE_FOLDER'),
      icon: mdiFolderPlusOutline,
      action: () => setCreateFolder(true)
    },
    {
      text: t('IDS_WP_UPLOAD_FILE'),
      icon: mdiFileUploadOutline,
      action: () => {
        document.getElementById('raised-button-add-file').click();
      }
    }
  ];

  return (<div className="AddNewButton">
    {selectedMenu.key === 'myDocument' ? (
      <StyledButton
        size="small"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="right-header-button"
      >
        <Icon path={mdiPlus} size={1} color="#fff" />
        {t('IDS_WP_ADD_NEW')}
      </StyledButton>
    ) : null}
    {showInputFile && (
      <input
        className="input-file"
        id="raised-button-add-file"
        type="file"
        multiple="multiple"
        onChange={handleUploadFile}
      />
    )}
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      transformOrigin={{ vertical: -50, horizontal: 0 }}
    >
      {listAction.map((el, idx) => (
        <MenuItem
          key={idx}
          onClick={() => {
            handleClose();
            el.action(el);
          }}
          className={`${
            idx % 2 === 0 && idx < listAction.length - 1
              ? 'border-item'
              : ''
            }`}
        >
          <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
&nbsp;&nbsp;&nbsp;{el.text}
        </MenuItem>
      ))}
    </Menu>

    {isCreateFolder && (
      <ModalCommon
        className="AddNewModal"
        title={t('IDS_WP_CREATE_FOLDER')}
        onClose={() => {
          setCreateFolder(false);
          setNameFolder('');
        }}
        loading={loading}
        footerAction={[
          {
            name: t('IDS_WP_CREATE_NEW'),
            action: () => handleCreateFolder(),
            disabled: isEmpty(nameFolder.trim())
          }
        ]}
      >
        <DialogContent dividers className="dialog-content AddNewModal--dialog">
          <TitleSectionModal label={t('IDS_WP_INPUT_NEW_FOLDER_NAME')} isRequired />
          <TextField
            value={nameFolder}
            id="standard-full-width"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
            onChange={event => setNameFolder(event.target.value)}
          />
        </DialogContent>
      </ModalCommon>
    )}
    {visibleUploadModal && (
      <UploadModal
        title={t('IDS_WP_UPLOAD_DOCUMENT')}
        open={visibleUploadModal}
        setOpen={val => setVisibleUploadModal(val)}
        fileUpload={fileUpload}
        onCompleted={() => {
          let params = {};
          if (!isEmpty(currentFolder)) {
            params.folder_id = currentFolder.id;
          }
          dispatch(actionFetchListMyDocument(params, true));
        }}
      />
    )}
  </div>)
}

export default AddNewButton;