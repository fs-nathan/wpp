import React from 'react';
import styled from 'styled-components';
import {
  ButtonGroup,
  Collapse,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import LocationShareBox from './LocationShareBox';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody() {
  const locations = useSelector(state => state.taskDetail.location.locations);
  const [value, setValue] = React.useState(0);

  const isNoData = locations.length === 0

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
            {value === 0 ? <ColorTypo bold>Tất cả</ColorTypo> : <ColorTypo color='gray'>Tất cả</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>Vị trí của tôi</ColorTypo> : <ColorTypo color='gray'>Vị trí của tôi</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        {
          isNoData ? <NoDataPlaceHolder
            src="/images/no-map.png"
            title="Chưa có vị trí nào được chia sẻ! Sử dụng ứng dụng Workplus trên điện thoại để chia sẻ vị trí của bạn."
          ></NoDataPlaceHolder> :
            <React.Fragment>
              <Collapse in={value === 0} mountOnEnter unmountOnExit>
                <LocationShareBox />
              </Collapse>
              <Collapse in={value === 1} mountOnEnter unmountOnExit>
                {null}
              </Collapse>
            </React.Fragment>
        }
      </div>
    </Body>
  )
}

export default TabBody;
