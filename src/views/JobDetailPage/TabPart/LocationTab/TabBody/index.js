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
            {value === 0 ? <ColorTypo bold>{t('LABEL_CHAT_TASK_TAT_CA')}</ColorTypo> : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_TAT_CA')}</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>{t('LABEL_CHAT_TASK_VI_TRI_CUA_TOI')}</ColorTypo> : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_VI_TRI_CUA_TOI')}</ColorTypo>}
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
                {null}
              </Collapse>
            </React.Fragment>
        }
      </div>
    </Body>
  )
}

export default TabBody;
