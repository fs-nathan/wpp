import { ButtonGroup, Collapse } from '@material-ui/core';
import { mdiFile, mdiImage, mdiLink } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ColorButton from 'components/ColorButton';
import ColorTypo from 'components/ColorTypo';
import colorPal from 'helpers/colorPalette';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import FileContainer from './FileContainer';
import LinkContainer from './LinkContainer';
import MediaContainer from './MediaContainer';
import './styles.scss';

function TabBody(props) {
  const { t } = useTranslation();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Scrollbars
      className="mediaBody"
      renderView={props => <div {...props} className="mediaBody--scroll" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-media-tabbody">
        <ButtonGroup className="mediaBody--buttonGroup"
          fullWidth variant="text" aria-label="full width outlined button group">
          <ColorButton
            className={clsx({ "mediaBody--button__selected": value === 0 })}
            startIcon={<Icon path={mdiImage} size={1} color={value === 0 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0 ? <ColorTypo bold>{t('LABEL_CHAT_TASK_MEDIA')}</ColorTypo> : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_MEDIA')}</ColorTypo>}
          </ColorButton>
          <ColorButton
            className={clsx({ "mediaBody--button__selected": value === 1 })}
            startIcon={<Icon path={mdiFile} size={1} color={value === 1 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1 ? <ColorTypo bold>{t('LABEL_CHAT_TASK_FILE')}</ColorTypo> : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_FILE')}</ColorTypo>}
          </ColorButton>
          <ColorButton
            className={clsx({ "mediaBody--button__selected": value === 2 })}
            startIcon={<Icon path={mdiLink} size={1} color={value === 2 ? colorPal['default'][0] : colorPal['gray'][0]} />}
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2 ? <ColorTypo bold>{t('LABEL_CHAT_TASK_LINK')}</ColorTypo> : <ColorTypo color='gray'>{t('LABEL_CHAT_TASK_LINK')}</ColorTypo>}
          </ColorButton>
        </ButtonGroup>
        <React.Fragment>
          <Collapse in={value === 0} mountOnEnter unmountOnExit timeout={0}>
            <MediaContainer {...props} />
          </Collapse>
          <Collapse in={value === 1} mountOnEnter unmountOnExit timeout={0}>
            <FileContainer {...props} />
          </Collapse>
          <Collapse in={value === 2} mountOnEnter unmountOnExit timeout={0}>
            <LinkContainer {...props} />
          </Collapse>
        </React.Fragment>
      </div>
    </Scrollbars>
  )
}

export default TabBody;
