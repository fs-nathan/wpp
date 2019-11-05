import React from 'react';
import { 
  List, ListItem, ListItemText, ListItemAvatar,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import _ from 'lodash';

function UserDocument({ open, setOpen, files }) {

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='File hồ sơ thành viên'
    >
      <List>
        {files.map(file => (
          <ListItem button key={_.get(file, 'id', '')} component='a' href={_.get(file, 'url', '/')} target='_blank'>
            <ListItemAvatar>
              <CustomAvatar alt='avatar' />
            </ListItemAvatar>
            <ListItemText
              primary={_.get(file, 'name', '')}
              secondary={`${_.get(file, 'size', 0)} bytes`}
            />
          </ListItem>
        ))}
      </List>
    </CustomModal>
  )
}

export default UserDocument;
