import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { updateDocumentInfo } from '../../../../actions/documents';

const EditDocumentInfoModal = props => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(
    new Date(props.item.date_released || new Date())
  );
  const [loading, setLoading] = useState(false);
  const formInfo = useRef(null);

  const handleUpdate = async e => {
    // e.preventDefault();
    try {
      setLoading(true);
      const { elements } = formInfo.current;
      const result = {
        file_id: props.item.id,
        description: elements.description.value,
        date_released: elements.date_released.value,
        version: elements.version.value,
        author: elements.author.value,
        user_approved: elements.user_approved.value,
        storage_address: elements.storage_address.value
      };
      await updateDocumentInfo(result);
      props.getData();
      setLoading(false);
      props.onClose();
    } catch (err) {
      setLoading(false);
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <ModalCommon
      title={t('IDS_WP_DOCUMENT_INFO')}
      onClose={props.onClose}
      loading={loading}
      footerAction={[{ name: t('IDS_WP_UPDATE'), action: handleUpdate }]}
    >
      <DialogContent dividers className="dialog-content">
        <form ref={formInfo}>
          <TextField
            id="description"
            label={t('IDS_WP_DOCUMENT_DES')}
            fullWidth
            margin="normal"
            multiline
            rows="2"
            rowsMax="4"
            defaultValue={props.item.description}
            InputLabelProps={{ shrink: true }}
            // inputProps={{ maxLength: 300 }}
            className="create-order-title"
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date_released"
              label={t('IDS_WP_DATE_RELEASE')}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="create-order-title"
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="version"
            label={t('IDS_WP_VERSION')}
            fullWidth
            margin="normal"
            defaultValue={props.item.version}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="author"
            label={t('IDS_WP_DOCUMENT_AUTHOR')}
            fullWidth
            margin="normal"
            defaultValue={props.item.author}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="user_approved"
            label={t('IDS_WP_USER_APPROVE')}
            fullWidth
            margin="normal"
            defaultValue={props.item.user_approved}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
          <TextField
            id="storage_address"
            label={t('IDS_WP_STORAGE_ADDRESS')}
            fullWidth
            margin="normal"
            defaultValue={props.item.storage_address}
            InputLabelProps={{ shrink: true }}
            className="create-order-title"
          />
        </form>
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(EditDocumentInfoModal);
