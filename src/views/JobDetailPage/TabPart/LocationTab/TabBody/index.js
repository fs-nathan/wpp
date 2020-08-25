import { ButtonGroup, Collapse } from '@material-ui/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ColorButton from '../../../../../components/ColorButton';
import ColorTypo from '../../../../../components/ColorTypo';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import LocationShareBox from './LocationShareBox';
import MapView from 'views/JobDetailPage/ChatComponent/MapView';
import { setLocationData } from 'actions/taskDetail/taskDetailActions';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function countLocations(groups = [], isMe = false) {
  let total = 0;
  groups.forEach((dateGroup) => {
    dateGroup.locations.forEach(({ is_me }) => {
      if (!isMe || (isMe && is_me)) {
        total += 1;
      }
    })
  })
  return total;
}

function TabBody() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const locations = useSelector(state => state.taskDetail.location.locations);
  // const myLocations = locations.filter(({ is_me }) => is_me)
  const [value, setValue] = React.useState(0);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [locationData, setLocationData] = React.useState({});

  const isNoData = locations.length === 0;

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };

  const handleClickLocation = (data) => {
    // console.log('handleClickLocation', data)
    setIsOpenMap(true);
    setLocationData(data);
  }

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-location-tabbody">
        <StyledButtonGroup fullWidth variant="text" aria-label="full width outlined button group">
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            <ColorTypo bold={value === 0} color={value === 0 ? 'black' : 'gray'}>
              {t('LABEL_CHAT_TASK_TAT_CA')}
              &nbsp;
              {`(${countLocations(locations)})`}
            </ColorTypo>
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            <ColorTypo bold={value === 1} color={value === 1 ? 'black' : 'gray'}>
              {t('LABEL_CHAT_TASK_VI_TRI_CUA_TOI')}
              &nbsp;
              {`(${countLocations(locations, true)})`}
            </ColorTypo>
          </ColorButton>
        </StyledButtonGroup>
        {
          isNoData ? <NoDataPlaceHolder
            src="/images/no-map.png"
            title={t('LABEL_CHAT_TASK_CHUA_CO_VI_TRI')}
          ></NoDataPlaceHolder> :
            <React.Fragment>
              <Collapse in={value === 0} mountOnEnter unmountOnExit timeout={0}>
                <LocationShareBox handleClickLocation={handleClickLocation} />
              </Collapse>
              <Collapse in={value === 1} mountOnEnter unmountOnExit timeout={0}>
                <LocationShareBox isMe handleClickLocation={handleClickLocation} />
              </Collapse>
            </React.Fragment>
        }
      </div>
      <MapView isOpen={isOpenMap} setOpen={setIsOpenMap} locationData={locationData} ></MapView>
    </Body>
  )
}

export default TabBody;
