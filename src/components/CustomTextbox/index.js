import { FormHelperText } from '@material-ui/core';
import { ContentState, convertFromRaw, Editor, EditorState, Entity, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import React from 'react';
import decorator from './EditorLink';
import './style.scss';

const { hasCommandModifier } = KeyBindingUtil;

export const getEditorData = (value) => {
  try {
    const raw = JSON.parse(value);
    const data = EditorState.createWithContent(convertFromRaw(raw), decorator);
    return data;
  } catch (e) {
    try {
      const data = EditorState.createWithContent(ContentState.createFromText(value), decorator);
      return data;
    } catch (e) {
      return EditorState.createEmpty(decorator);
    }
  }
}

function myKeyBindingFn(e) {
  if (e.keyCode === 85 /* `U` key */ && hasCommandModifier(e)) {
    return 'under-line';
  }
  if (e.keyCode === 66 /* `B` key */ && hasCommandModifier(e)) {
    return 'bold';
  }
  if (e.keyCode === 73 /* `I` key */ && hasCommandModifier(e)) {
    return 'italic';
  }
  return getDefaultKeyBinding(e);
}

function CustomTextbox({ value, onChange, isReadOnly = false, maxHeight = 100, className = '', helperText = '' }) {
  const editor = React.useRef(null);

  function focusEditor() {
    if (!isReadOnly)
      editor.current.focus();
  }

  function onClickBold() {
    onChange(RichUtils.toggleInlineStyle(value, 'BOLD'));
  }

  function onClickItalic() {
    const edited = RichUtils.toggleInlineStyle(value, 'ITALIC')
    onChange(edited);
  }

  function onClickUnderline() {
    const edited = RichUtils.toggleInlineStyle(value, 'UNDERLINE')
    onChange(edited);
  }

  function onClickLink() {
    const selection = value.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(value, selection, null))
    } else {
      const selected = getFragmentFromSelection(value);
      const url = (selected ? selected.map(x => x.getText()).join('\n') : '');
      console.log('url', url)
      const entityKey = Entity.create('LINK', 'MUTABLE', { url });
      onChange(RichUtils.toggleLink(value, selection, entityKey));
    }
  }

  function handleKeyCommand(command) {
    if (command === 'under-line') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      onClickUnderline()
      return 'handled';
    }
    if (command === 'bold') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      onClickBold()
      return 'handled';
    }
    if (command === 'italic') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      onClickItalic()
      return 'handled';
    }
    return 'not-handled';
  }

  const [innerHeight, setInnerHeight] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  const innerRef = React.useCallback(node => {
    if (node !== null) {
      setInnerHeight(node.getBoundingClientRect().height);
    }
  }, [value]);

  return (
    <div
      className={`comp_CustomTextBox___textbox${isReadOnly ? '-readonly' : ''} ${className}`}
    >
      <div
        style={{
          maxHeight: !isReadOnly || showMore ? 'initial' : maxHeight,
          overflow: !isReadOnly || showMore ? 'initial' : 'hidden',
        }}
      >
        <div
          onClick={focusEditor}
          ref={innerRef}
        >
          <Editor
            ref={editor}
            readOnly={isReadOnly}
            editorState={value}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
          />
        </div>
        {!isReadOnly &&
          <FormHelperText error filled variant='filled'>
            {helperText}
          </FormHelperText>
        }
      </div>
      {isReadOnly && innerHeight > maxHeight && <span onClick={() => setShowMore(old => !old)}>{showMore ? 'Thu gọn' : 'Mở rộng'}</span>}
    </div>
  );
}

export default CustomTextbox;