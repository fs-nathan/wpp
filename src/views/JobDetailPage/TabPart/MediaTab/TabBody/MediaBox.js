import { GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { showImagesList } from 'actions/chat/chat';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import MenuListItem from './MenuListItem';
import './styles.scss';

const MediaBox = (props) => {
  const dispatch = useDispatch();
  const imageData = useSelector(state => state.taskDetail.media.image);

  function onClickImage(key, idx) {
    dispatch(showImagesList(true, imageData.images[key].images, idx));
  }

  return (
    <div className="mediaBox" >
      <Scrollbars
        className="mediaBox--body"
        renderView={props => <div {...props} className="mediaBox--scroll" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
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
                        <img src={item.url} alt='avatar' className="image-media-box" />
                        <MenuListItem item={item} />
                      </GridListTile>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </GridList>
      </Scrollbars>
    </div>
  );
}

export default MediaBox