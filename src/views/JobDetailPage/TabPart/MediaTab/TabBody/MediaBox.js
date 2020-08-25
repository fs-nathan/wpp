import { GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { showImagesList } from 'actions/chat/chat';
import { getImage } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from 'views/JobDetailPage/selectors';
import MenuListItem from './MenuListItem';
import './styles.scss';

const MediaBox = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const imageData = useSelector(state => state.taskDetail.media.image);
  const taskId = useSelector(taskIdSelector);
  const paging = useSelector(state => state.taskDetail.media.image.paging);
  const isLoading = useSelector(state => state.taskDetail.media.isFetching);
  const { total_page, page } = paging || {};

  function onClickImage(key, idx) {
    dispatch(showImagesList(true, imageData.images[key].images, idx));
  }

  function loadMoreMedia() {
    dispatch(getImage({ taskId, page: page + 1 }));
  }

  return (
    <div className="mediaBox" >
      <Scrollbars
        className="mediaBox--body"
        renderView={props => <div {...props} className="mediaBox--scroll" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        <InfiniteScroll
          className="mediaBox--scrollLoad"
          loadMore={loadMoreMedia}
          pageStart={1}
          hasMore={page < total_page}
          loader={<div className="mediaBody--loader" key={0}>{t('LABEL_CHAT_TASK_DANG_TAI')}</div>}
          useWindow={false}
        >
          <GridList className="mediaBox--grid" cellHeight={60} cols={5} style={{ margin: 0 }}>
            {imageData.images && imageData.images.map((image, key) => {
              return (
                image.images.length > 0 &&
                <div className="media-image" key={key}>
                  <GridListTile className="mediaBox--createdAt" cols={5}>
                    <ListSubheader className="mediaBox--subHeader" component='div'>{image.date_create}</ListSubheader>
                  </GridListTile>
                  <div className="wrap-image">
                    {image.images.map((item, idx) => {
                      return (
                        <GridListTile className="mediaBox--item"
                          onClick={() => onClickImage(key, idx)}
                          key={idx}>
                          <img src={item.url_thumbnail} alt='avatar' className="image-media-box" />
                          <MenuListItem item={item} />
                        </GridListTile>
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </GridList>
        </InfiniteScroll>
      </Scrollbars>
    </div>
  );
}

export default MediaBox