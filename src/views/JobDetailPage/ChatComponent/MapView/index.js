import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@mdi/react';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useRef, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DialogTitleModalMap from './DialogTitleModalMap';
import clsx from 'clsx';
import './styles.scss';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import {
  IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText,
  ListSubheader, Menu, MenuItem, Dialog
} from '@material-ui/core';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import ColorTypo from 'components/ColorTypo';
import { withStyles } from '@material-ui/core/styles';
import { ic_share_location } from 'assets';
import { setLocationData } from 'actions/taskDetail/taskDetailActions';
import ReactBingmaps from 'components/BingMap';
import { Scrollbars } from 'react-custom-scrollbars';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const HeaderSubText = styled(ListSubheader)`
  display: inline-block;
  width: 100%;
  position: relative;  
  font-size: 14px;
  font-weight: 600;
  color: #9e9e9e;
  padding: 0;
  margin: 0;
`

const ItemAvatar = styled(ListItemAvatar)`
  & > div {
    background: #f2f2f2;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledDialog = styled(Dialog)`
    & > div > div {    
        background: transparent;
    }
`
const ContentDialog = styled(DialogContent)`
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    & > div:nth-child(2) {
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    & > video:focus {
      outline: none;
    }
`

const MapView = ({ isOpen, setOpen, locationData }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const transformRef = useRef();
  const dispatch = useDispatch();
  let locationArr = useSelector(state => state.taskDetail.location.locations);
  // const locationData = useSelector(state => state.taskDetail.detailTask.location);
  const [data, setData] = useState(locationData);
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    setData(locationData)
  }, [locationData])

  const { id, address, date_create,
    user_share, time_create, lat = 21, lng = 105,
    user_share_avatar, room, roles } = data;

  function handleClose() {
    setOpen(false)
    dispatch(setLocationData(null))
  }

  const handleClickLocation = (data) => {
    console.log('handleClickLocation', data)
    setData(data)
  }

  const containerStyle = {
    width: '75%',
    height: '100%'
  };


  const onLoad = React.useCallback(function callback(map) {
    // console.log('load map')
    const bounds = new window.google.maps.LatLngBounds();
    // const iconSize = new window.google.maps.Size(64, 64)
    // setSize(iconSize)
    // bounds.extend(center)
    // map.setZoom(18)
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  return (
    <StyledDialog
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullScreen={fullScreen}
      className="MapView"
    >
      <DialogTitleModalMap id="customized-dialog-title"
        {...{ address, date_create, user_share, time_create, user_share_avatar, room, roles }}
        onClose={handleClose}>
      </DialogTitleModalMap>
      <ContentDialog id="ContentDialog-ImageModal">
        <ReactBingmaps 
          bingmapKey="Alc_koSa09rEFKDsAHRKxCl3rlxGcciXzRFL1C9SwD73wroZmHG5ZuKCF9Z-fp2p" 
          disableStreetside={false}
          center={[lat, lng]}
          // pushPins={[{
          //   "location":[lat, lng], "option":{ icon: user_share_avatar, title: address, width: 25, height: 39, },
          // }]}
          pushPinsHtml={[
            {
              location: {
                latitude: lat, longitude: lng
              },
              html: `<div class="marker-location-share">
                <img src="${user_share_avatar}" class="img-main">
                <img src="${ic_share_location}" class="img-marker">
                <div class="title-marker">${user_share}</div>
              </div>`
            }
          ]}
          zoom = {16}
          > 
        </ReactBingmaps>
        {/* <LoadScript
          googleMapsApiKey="AIzaSyC0iTTmOVJrNX4PXjD8C4ObSGOXCUwJchg"
        >
          {lat && <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              icon={ic_share_location}
            </Marker>
            <OverlayView
              position={{ lat, lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <img className="MapView--userMark" src={user_share_avatar} alt="user"></img>
            </OverlayView>
          </GoogleMap>
          }
        </LoadScript> */}
        <ListItem className="MapView--list MapView-share-location-chat">
          <div className="MapView--listTitle">{t('LABEL_CHAT_TASK_DANH_SACH_VI_TRI')}</div>
          <div className="MapView--listContent">
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
              {Array.isArray(locationArr) && locationArr.map((location, idx) => {
                return (<div
                  className={clsx("styled-list-item-location list-location-share-on-chat")}
                  key={idx}>
                  <HeaderSubText component='p'>{location.date_create}</HeaderSubText>
                  {location.locations.map((item, key) => {
                    return (
                      <div className={clsx("MapView--location", {
                        'MapView--location__selected': id === item.id
                      })}
                        key={key} onClick={() => handleClickLocation({ ...item })}>
                        <ItemAvatar>
                          <div>
                            <Icon path={mdiMapMarker} alt='map' size={2} color={'#f44336'} style={{ padding: 5 }} />
                          </div>
                        </ItemAvatar>
                        <ListItemText
                          className="LocationItem--content"
                          primary={item.user_share}
                          secondary={
                            <span>
                              <ColorTypo className="LocationItem--time" variant='caption' color='blue'>{t('LABEL_CHAT_TASK_CHIA_SE_LUC', { createdAt: `${item.time_create} - ${item.date_create}` })}</ColorTypo>
                              <br />
                              <ColorTypo className="LocationItem--location" variant='caption'>{item.address}</ColorTypo>
                            </span>
                          }
                        />
                      </div>
                    )
                  })}
                </div >
                )
              })}
            </Scrollbars>
          </div>
        </ListItem >
      </ContentDialog>
    </StyledDialog >
  )
}

export default memo(MapView);