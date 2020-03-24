import ColorTypo from 'components/ColorTypo';
import TextEditor, { getEditorData } from 'components/TextEditor';
import { getCollapseText, isLongerContent } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import './styles.scss';

function Description({ value }) {
  const [isOpen, setOpen] = React.useState(true)
  const handlePressViewButton = () => {
    setOpen(!isOpen)
  }
  const raw = getEditorData(value).getCurrentContent().getPlainText();
  const isLong = isLongerContent(raw);
  const contentCollapsed = getEditorData(getCollapseText(raw));
  // console.log('raw', raw)
  return (
    <div className="tabBodyDescription">
      <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
      <TextEditor isReadOnly
        value={isOpen ? getEditorData(value) : contentCollapsed}
      >
      </TextEditor>
      {
        isLong &&
        <div className="tabBodyDescription--more" onClick={handlePressViewButton}>
          {isOpen ? "Thu gọn" : "Xem thêm"}
        </div>
      }
    </div >
  )
}

export default Description