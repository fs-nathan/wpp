import { IconButton, List, ListItem } from '@material-ui/core';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { showImagesList } from 'actions/chat/chat';
import { actionDownloadFile } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import MenuListItem from './MenuListItem';

const FileBox = (props) => {
  const file = useSelector(state => state.taskDetail.media.file);
  const dispatch = useDispatch();

  function onClickFile(file, idx) {
    const type = getFileType(file.name);
    return () => {
      if (type === 'mp4') {
        // const user = { user_create_avatar, user_create_name, time_create, user_create_position };
        dispatch(showImagesList(true, [file], 0));
      } else {
        dispatch(openDocumentDetail({ ...file, type: type }));
      }
    }
  }

  function onClickDownload(file) {
    return () => {
      actionDownloadFile(file)
    }
  }

  return (
    <div className="fileBox">
      <Scrollbars
        className="fileBox--body"
        renderView={props => <div {...props} className="fileBox--scroll" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        <List className="fileBox--list">
          {file.files && file.files.map((item, idx) => {
            return (
              <ListItem className="fileBoxItem" key={idx} >
                <img src={item.file_icon} alt='avatar' onClick={onClickFile(item, 0)} />
                <div className="fileBoxItem--content" >
                  <div className="fileBoxItem--name" onClick={onClickFile(item, 0)}>{item.name}</div>
                  <div className="fileBoxItem--downloaded">
                    {[item.type, item.size].join(' - ').toUpperCase()}
                    <IconButton className="fileBoxItem--button"
                      onClick={onClickDownload(item)}
                      size='small'>
                      <a href={item.url}>
                        <Icon path={mdiDownload} size={1} />
                      </a>
                    </IconButton>
                  </div>
                </div>
                <MenuListItem item={item} colorIcon={'#000'} />
              </ListItem>
            )
          })}
        </List>
      </Scrollbars>
    </div>
  );
}

export default FileBox