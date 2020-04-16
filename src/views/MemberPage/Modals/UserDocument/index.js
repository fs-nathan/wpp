import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomModal from '../../../../components/CustomModal';

function UserDocument({ open, setOpen, files = [] }) {

  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t("DMH.VIEW.MP.MODAL.DOC.TITLE")}
      cancleRender={() => t("DMH.VIEW.MP.MODAL.DOC.EXIT")}
      confirmRender={null}
    >
      <List>
        {files.map(file => (
          <ListItem button key={get(file, 'id', '')} component='a' href={get(file, 'url', '/')} target='_blank'>
            <ListItemAvatar>
              <CustomAvatar alt='avatar' />
            </ListItemAvatar>
            <ListItemText
              primary={get(file, 'name', '')}
              secondary={`${get(file, 'size', 0)} bytes`}
            />
          </ListItem>
        ))}
      </List>
    </CustomModal>
  )
}

export default UserDocument;
