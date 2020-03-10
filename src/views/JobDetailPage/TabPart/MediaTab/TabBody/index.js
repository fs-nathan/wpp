import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiImage, mdiFile, mdiLink } from '@mdi/js';
import {
  ButtonGroup,
  Collapse,
} from '@material-ui/core';
import get from 'lodash/get';

import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import colorPal from '../../../../../helpers/colorPalette';
import { Scrollbars } from 'react-custom-scrollbars';

import MediaContainer from './MediaContainer';
import FileContainer from './FileContainer';
import LinkContainer from './LinkContainer';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {
  const links = useSelector(state => state.taskDetail.media.links);
  const file = useSelector(state => state.taskDetail.media.file);
  const image = useSelector(state => state.taskDetail.media.image);
  const isNoData = (get(links, 'links.length', 0) + get(file, 'files.length', 0) + get(image, 'images.length', 0)) === 0;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-media-tabbody">
        <StyledButtonGroup fullWidth variant="text" aria-label="full width outlined button group">
          <ColorButton
            startIcon={<Icon path={mdiImage} size={1} color={value === 0 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0 ? <ColorTypo bold>Media</ColorTypo> : <ColorTypo color='gray'>Media</ColorTypo>}
          </ColorButton>
          <ColorButton
            startIcon={<Icon path={mdiFile} size={1} color={value === 1 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>File</ColorTypo> : <ColorTypo color='gray'>File</ColorTypo>}
          </ColorButton>
          <ColorButton
            startIcon={<Icon path={mdiLink} size={1} color={value === 2 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2 ? <ColorTypo bold>Link</ColorTypo> : <ColorTypo color='gray'>Link</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        {isNoData ? <NoDataPlaceHolder
          src="/images/no-files.png"
          title="Chưa có tài liệu nào được chia sẻ! Thêm tài liệu bằng cách kéo thả, chụp màn hình hoặc lấy từ thư viện tài liệu."
        ></NoDataPlaceHolder> :
          <React.Fragment>
            <Collapse in={value === 0} mountOnEnter unmountOnExit>
              <MediaContainer {...props} />
            </Collapse>
            <Collapse in={value === 1} mountOnEnter unmountOnExit>
              <FileContainer {...props} />
            </Collapse>
            <Collapse in={value === 2} mountOnEnter unmountOnExit>
              <LinkContainer {...props} />
            </Collapse>
          </React.Fragment>
        }
      </div>
    </Body>
  )
}

export default TabBody;
