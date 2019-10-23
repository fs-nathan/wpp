import React from 'react';
import { 
  Avatar, List, ListItem, ListItemText, ListItemAvatar,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import avatar from '../../../../assets/avatar.jpg';
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
              <Avatar src={avatar} alt='avatar' />
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
