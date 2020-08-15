import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@mdi/react';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useRef, useState, memo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DialogTitleModalMap from './DialogTitleModalMap';
import CustomMarker from './CustomMarker';
import './styles.scss';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import {
  IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText,
  ListSubheader, Menu, MenuItem, Dialog
} from '@material-ui/core';
import { mdiDotsHorizontal, mdiMapMarker } from '@mdi/js';
import ColorTypo from 'components/ColorTypo';
import { withStyles } from '@material-ui/styles';

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

const MapView = ({ isOpen, setOpen }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const transformRef = useRef();
  const dispatch = useDispatch();
  let locationArr = useSelector(state => state.taskDetail.location.locations);
  const locationData = useSelector(state => state.taskDetail.detailTask.location);
  const { address, date_create,
    user_share, time_create, lat = 21, lng = 105,
    user_share_avatar, room, roles } = locationData;
  const [zoom, setZoom] = useState(20);
  const [size, setSize] = useState({});
  const [center, setCenter] = useState({ lat, lng });

  useEffect(() => {
    setTimeout(() => {
      setZoom(18)
    }, 2000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (lat)
        setCenter({ lat, lng })
      setZoom(18)
    }, 1000)
  }, [lat, lng])

  function handleClose() {
    setOpen(false)
  }

  const handleClickLocation = (data) => {
    // console.log('handleClickLocation', data)
    const { lat, lng } = data;
    setCenter({ lat, lng })
    setZoom(18)
  }

  const containerStyle = {
    width: '70%',
    height: '100%'
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    console.log('load map')
    const bounds = new window.google.maps.LatLngBounds();
    // const iconSize = new window.google.maps.Size(64, 64)
    // setSize(iconSize)
    // bounds.extend(center)
    setTimeout(() => {
      map.fitBounds(bounds);
      setCenter({ lat, lng })
      setZoom(18)
    }, 100)
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
        <LoadScript
          googleMapsApiKey="AIzaSyDeZ2O_NB6rLnIdYjzgk4hsvpuEZS_NR-E"
        >
          {lat && <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker
              // options={{ icon: { url: user_share_avatar, scaledSize: size, size: size } }}
              position={{ lat, lng }}>
            </Marker>
            {/* <InfoWindow
              onLoad={onLoad}
              position={center}
            >
              <CustomMarker
                lat={lat}
                lng={lng}
                position={center}
                user_share_avatar={user_share_avatar}
              />
            </InfoWindow> */}
          </GoogleMap>
          }
        </LoadScript>
        <ListItem className="MapView--list">
          <div className="MapView--listTitle">{t('LABEL_CHAT_TASK_DANH_SACH_VI_TRI')}</div>
          {Array.isArray(locationArr) && locationArr.map((location, idx) => {
            return (<div className="styled-list-item-location" key={idx}>
              <HeaderSubText component='p'>{location.date_create}</HeaderSubText>
              {location.locations.map((item, key) => {
                return (
                  <div className="MapView--location" key={key} onClick={() => handleClickLocation({ ...item })}>
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
        </ListItem >
      </ContentDialog>
    </StyledDialog >
  )
}

export default memo(MapView);