import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { isEqual } from 'lodash';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { isEmpty } from '../../../../helpers/utils/isEmpty';

const ChangeDocumentModal = props => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.item.name);
  const handleUpdate = async () => {
    props.onOk(value);
  };
  const handleChangeText = value => {
    setValue(value);
  };
  return (
    <ModalCommon
      title={t('IDS_WP_CHANGE_DOCUMENT_NAME')}
      onClose={props.onClose}
      footerAction={[
        {
          name: t('IDS_WP_UPDATE'),
          action: handleUpdate,
          disabled: isEmpty(value.trim()) || isEqual(value, props.item.name)
        }
      ]}
    >
      <DialogContent dividers className="dialog-content">
        <TextField
          value={value}
          variant="outlined"
          id="standard-full-width"
          label={t('IDS_WP_DOCUMENT_NAME')}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          className="create-order-title"
          onChange={event => handleChangeText(event.target.value)}
        />
      </DialogContent>
    </ModalCommon>
  );
};

export default withRouter(ChangeDocumentModal);
