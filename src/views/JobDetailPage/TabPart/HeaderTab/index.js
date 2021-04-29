import {IconButton} from '@material-ui/core';
import {mdiAccountCogOutline, mdiChevronLeft, mdiSettings} from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import ColorTypo from '../../../../components/ColorTypo';
import './styles.scss';


function HeaderTab({ title, onClickBack, onClickOpen, rightIcon, buttonTooltipText }) {
  const { t } = useTranslation();

  return (
    <div className="headerTab">
      <IconButton className="headerTab--button" onClick={onClickBack}>
        <abbr title={t('LABEL_CHAT_TASK_QUAY_LAI')}>
          <Icon path={mdiChevronLeft} size={1} />
        </abbr>
      </IconButton>
      <ColorTypo className="headerTab--text" uppercase >{title}</ColorTypo>
      <IconButton
        className={clsx("headerTab--button", { "headerTab--button__hidden": rightIcon === null })}
        onClick={onClickOpen}
      >
        <abbr title={buttonTooltipText || t('LABEL_CHAT_TASK_CAI_DAT')}>
          <Icon path={rightIcon === "settings" ? mdiAccountCogOutline : mdiSettings} size={1} />
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
