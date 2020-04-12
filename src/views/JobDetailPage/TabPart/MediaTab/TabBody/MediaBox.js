import { GridList, GridListTile, ListSubheader } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuListItem from './MenuListItem';
import './styles.scss';

const MediaBox = (props) => {
  const image = useSelector(state => state.taskDetail.media.image);
  return (
    <GridList className="mediaBox" cellHeight={60} cols={5} style={{ margin: 0 }}>
      {image.images && image.images.map((image, key) => {
        return (
          <div className="media-image" key={key}>
            <GridListTile className="mediaBox--createdAt" cols={5}>
              <ListSubheader className="mediaBox--subHeader" component='div'>{image.date_create}</ListSubheader>
            </GridListTile>
            <div className="wrap-image">
              {image.images.map((item, idx) => {
                return (
                  <GridListTile className="mediaBox--item" key={idx}>
                    <img src={item.url} alt='avatar' className="image-media-box" />
                    <MenuListItem />
                  </GridListTile>
                )
              })}
            </div>
          </div>
        );
      })}
    </GridList>
  );
}

export default MediaBox