import React from 'react';
import { IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';

import './styles.scss';

function HeaderTab({ title, onClickBack, onClickOpen }) {

  return (
    <div className="headerTab">
      <IconButton className="headerTab--button" onClick={onClickBack}>
        <abbr title="Quay lại">
          <Icon path={mdiChevronLeft} size={1} />
        </abbr>
      </IconButton>
      <ColorTypo className="headerTab--text" uppercase >{title}</ColorTypo>
      <IconButton className="headerTab--button" onClick={onClickOpen}>
        <abbr title="Cài đặt">
          <Icon path={mdiSettings} size={1} />
        </abbr>
      </IconButton>
    </div>
  );
}

export default HeaderTab;
