import { ButtonGroup, Collapse } from '@material-ui/core';
import { mdiFile, mdiImage, mdiLink } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ColorButton from 'components/ColorButton';
import ColorTypo from 'components/ColorTypo';
import colorPal from 'helpers/colorPalette';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FileContainer from './FileContainer';
import LinkContainer from './LinkContainer';
import MediaContainer from './MediaContainer';
import './styles.scss';

function TabBody(props) {
  const { t } = useTranslation();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const {
    total_file, total_img, total_link,
  } = detailTask || {}
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-media-tabbody mediaBody">
      <ButtonGroup className="mediaBody--buttonGroup"
        fullWidth variant="text" aria-label="full width outlined button group">
        <ColorButton
          className={clsx({ "mediaBody--button__selected": value === 0 })}
          startIcon={<Icon path={mdiImage} size={1} color={value === 0 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 0)}
        >
          <ColorTypo bold={value === 0} color={value === 0 ? 'black' : 'gray'}>
            {t('LABEL_CHAT_TASK_MEDIA')} &nbsp;{`(${total_img})`}
          </ColorTypo>
        </ColorButton>
        <ColorButton
          className={clsx({ "mediaBody--button__selected": value === 1 })}
          startIcon={<Icon path={mdiFile} size={1} color={value === 1 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 1)}
        >
          <ColorTypo bold={value === 1} color={value === 1 ? 'black' : 'gray'}>
            {t('LABEL_CHAT_TASK_FILE')}
            &nbsp;{`(${total_file})`}
          </ColorTypo>
        </ColorButton>
        <ColorButton
          className={clsx({ "mediaBody--button__selected": value === 2 })}
          startIcon={<Icon path={mdiLink} size={1} color={value === 2 ? colorPal['default'][0] : colorPal['gray'][0]} />}
          onClick={evt => handleChange(evt, 2)}
        >
          <ColorTypo bold={value === 2} color={value === 2 ? 'black' : 'gray'}>
            {t('LABEL_CHAT_TASK_LINK')}
            &nbsp;{`(${total_link})`}
          </ColorTypo>
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
  )
}

export default TabBody;
