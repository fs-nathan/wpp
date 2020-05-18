import { ButtonGroup, Collapse } from '@material-ui/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ColorButton from '../../../../../components/ColorButton';
import ColorTypo from '../../../../../components/ColorTypo';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import LocationShareBox from './LocationShareBox';


const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody() {
  const { t } = useTranslation();
  const locations = useSelector(state => state.taskDetail.location.locations);
  const myLocations = locations.filter(({ is_me }) => is_me)
  const [value, setValue] = React.useState(0);

  const isNoData = locations.length === 0;

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };

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
              {`(${locations.length})`}
            </ColorTypo>
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            <ColorTypo bold={value === 1} color={value === 1 ? 'black' : 'gray'}>
              {t('LABEL_CHAT_TASK_VI_TRI_CUA_TOI')}
              &nbsp;
              {`(${myLocations.length})`}
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
                <LocationShareBox />
              </Collapse>
              <Collapse in={value === 1} mountOnEnter unmountOnExit timeout={0}>
                <LocationShareBox isMe />
              </Collapse>
            </React.Fragment>
        }
      </div>
    </Body>
  )
}

export default TabBody;
