import ColorTypo from 'components/ColorTypo';
import { getCollapseText, getRichContent, isLongerContent } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function Description({ value }) {
  const { t } = useTranslation();
  const [isOpen, setOpen] = React.useState(true)
  const handlePressViewButton = () => {
    setOpen(!isOpen)
  }
  const isLong = isLongerContent(value);
  const contentCollapsed = getCollapseText(value);
  // console.log('raw', raw)
  return (
    <div className="tabBodyDescription">
      <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>{t('LABEL_CHAT_TASK_MO_TA')}</ColorTypo>
      <div className="Description--content"
        dangerouslySetInnerHTML={{
          __html: getRichContent(isOpen ? value : contentCollapsed)
        }}
      >
      </div>
      {
        isLong &&
        <div className="tabBodyDescription--more" onClick={handlePressViewButton}>
          {isOpen ? t('LABEL_CHAT_TASK_THU_GON') : t('LABEL_CHAT_TASK_XEM_THEM')}
        </div>
      }
    </div >
  )
}

export default Description