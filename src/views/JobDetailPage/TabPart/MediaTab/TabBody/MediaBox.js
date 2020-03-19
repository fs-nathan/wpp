import React from 'react';
import styled from 'styled-components';
import {
  GridList, GridListTile, ListSubheader,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import MenuListItem from './MenuListItem';

const SubHeader = styled(ListSubheader)`
  padding: 0;
  font-size: 14px;
`

export const ImageMedia = styled(GridListTile)`
  margin-right: 7px;
`

const MediaBox = (props) => {
  const image = useSelector(state => state.taskDetail.media.image);
  return (
    <GridList className="mediaBox" cellHeight={60} cols={5} style={{ display: "inline-block" }}>
      {image.images && image.images.map((image, key) => {
        return (
          <div className="media-image" key={key}>
            <GridListTile cols={5}>
              <SubHeader component='div'>{image.date_create}</SubHeader>
            </GridListTile>
            <div className="wrap-image">
              {image.images.map((item, idx) => {
                return (
                  <ImageMedia key={idx}>
                    <img src={item.url} alt='avatar' className="image-media-box" />
                    <MenuListItem />
                  </ImageMedia>
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