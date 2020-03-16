import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSettings, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';

import './styles.scss';

function HeaderTab({ title, onClickBack, onClickOpen, rightIcon }) {

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
          <Icon path={rightIcon === "add" ? mdiPlus : mdiSettings} size={1} />
        </abbr>
      </IconButton>
    </div>
  );
}

HeaderTab.propTypes = {
  rightIcon: PropTypes.oneOf(["add", "settings"]),
}

HeaderTab.defaultProps = {
  rightIcon: "add",
}

export default HeaderTab;
