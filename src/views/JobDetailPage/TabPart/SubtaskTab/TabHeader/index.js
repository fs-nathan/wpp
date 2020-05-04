import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { getSubTask } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { taskIdSelector } from '../../../selectors';
import '../../HeaderTab/styles.scss';

const ButtonCancel = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  padding: 12px 8px;
  margin-right: 5px;
  border-radius: 50%;
  color: red;
  cursor: pointer;
`

function TabHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  // console.log('header props::', props)
  useEffect(() => {
    dispatch(getSubTask({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isPlus, setOnPlus] = React.useState(true)
  const handleClick = () => {
    setOnPlus(!isPlus)
  }
  function onClickBack() {
    props.setShow(0)
  }
  return (
    <div className="headerTab">
      <IconButton className="headerTab--button" onClick={onClickBack}>
        <abbr title={t('LABEL_CHAT_TASK_QUAY_LAI')}>
          <Icon path={mdiChevronLeft} size={1} />
        </abbr>
      </IconButton>
      <ColorTypo className="headerTab--text" uppercase>{t('LABEL_CHAT_TASK_CONG_VIEC_CON')}</ColorTypo>
      {isPlus ?
        <IconButton className="headerTab--button" onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>
          <abbr title={t('LABEL_CHAT_TASK_THEM')}>
            <Icon path={mdiPlus} size={1} />
          </abbr>
        </IconButton>
        :
        <ButtonCancel onClick={() => {
          props.onClickPlusIcon()
          handleClick()
        }
        }>{t('LABEL_CHAT_TASK_HUY')}</ButtonCancel>
      }
    </div>
  );
}

export default TabHeader;