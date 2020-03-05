import React from 'react';
import {
  List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem
} from '@material-ui/core';
import styled from 'styled-components';
import { EditorState, convertFromRaw, ContentState } from 'draft-js';

import { isLongerContent, getCollapseText } from '../../../../../helpers/jobDetail/stringHelper'
import TextEditor from '../../../../../components/TextEditor';
import ColorTypo from '../../../../../components/ColorTypo';

const ListItemTabPart = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: start;
`
const getEditorData = (value) => {
  try {
    const raw = JSON.parse(value);
    const data = EditorState.createWithContent(convertFromRaw(raw));
    return data;
  } catch (e) {
    try {
      const data = EditorState.createWithContent(ContentState.createFromText(value));
      return data;
    } catch (e) {
      return EditorState.createEmpty();
    }
  }
}

function Description({ value }) {
  const [isOpen, setOpen] = React.useState(false)
  const handlePressViewButton = () => {
    setOpen(!isOpen)
  }
  return (
    <ListItemTabPart>
      {
        !isLongerContent(value)
          ? <ListItemText
            primary={
              <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
            }
            secondary={
              <TextEditor isReadOnly
                value={getEditorData(value)}
              >
              </TextEditor>
              // <ColorTypo component='span' style={{ fontSize: 15 }}>{value}</ColorTypo>
            }
          />
          :
          <>
            <ListItemText
              primary={
                <ColorTypo color='gray' uppercase bold style={{ marginBottom: '5px' }}>Mô tả</ColorTypo>
              }
              secondary={
                // <ColorTypo component='span' style={{ fontSize: 15 }}>
                //   {isOpen ? value : getCollapseText(value)}
                // </ColorTypo>
                <TextEditor isReadOnly
                  value={getEditorData(value)}
                >
                </TextEditor>
              }
            />
            {isOpen
              ? <div className="button-text" onClick={handlePressViewButton}>Thu gọn</div>
              : <div className="button-text" onClick={handlePressViewButton}>Xem thêm</div>
            }
          </>
      }
    </ListItemTabPart>
  )
}

export default Description