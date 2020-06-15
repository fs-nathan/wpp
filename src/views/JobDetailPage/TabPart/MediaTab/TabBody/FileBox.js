import { IconButton, List, ListItem } from '@material-ui/core';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { showImagesList } from 'actions/chat/chat';
import { actionDownloadFile } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import { getFileTabPart } from 'actions/taskDetail/taskDetailActions';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from 'views/JobDetailPage/selectors';
import MenuListItem from './MenuListItem';
import * as fileType from 'assets/fileType';
import { FileType } from 'components/FileType';

const FileBox = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const file = useSelector(state => state.taskDetail.media.file);
  const taskId = useSelector(taskIdSelector);
  const paging = useSelector(state => state.taskDetail.media.file.paging);
  const { total_page, page } = paging || {};

  function onClickFile(file, idx) {
    const type = getFileType(file.name);
    return () => {
      if (FileType(type) === fileType.video) {
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

  function loadMoreMedia() {
    dispatch(getFileTabPart({ taskId, page: page + 1 }));
  }

  return (
    <div className="fileBox">
      <Scrollbars
        className="fileBox--body"
        renderView={props => <div {...props} className="fileBox--scroll" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        <InfiniteScroll
          className="mediaBox--scrollLoad"
          loadMore={loadMoreMedia}
          pageStart={1}
          hasMore={page < total_page}
          loader={<div className="mediaBody--loader" key={0}>{t('LABEL_CHAT_TASK_DANG_TAI')}</div>}
          useWindow={false}
        >
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
                        <Icon className="fileBoxItem--icon" path={mdiDownload} size={1} color={'#b9b9b9'} />
                      </IconButton>
                    </div>
                  </div>
                  <MenuListItem item={item} colorIcon={'#000'} />
                </ListItem>
              )
            })}
          </List>
        </InfiniteScroll>
      </Scrollbars>
    </div>
  );
}

export default FileBox