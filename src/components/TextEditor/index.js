import clsx from 'classnames';
// import 'draft-js/dist/Draft.css';
import { ContentState, convertFromRaw, Editor, EditorState, Entity, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import React from 'react';
import decorator from './EditorLink';
import './styles.scss';



const { hasCommandModifier } = KeyBindingUtil;

export const getEditorData = (value = '') => {
  try {
    if (typeof value === "string") {
      const raw = JSON.parse(value);
      const data = EditorState.createWithContent(convertFromRaw(raw), decorator);
      return data;
    }
    // console.log('getEditorData', typeof value)
    return value;
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

function TextEditor({ value, onChange, isReadOnly = false, className }) {
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

  return (
    <div className={clsx("editor", { "editor--readOnly": isReadOnly })}>
      <div
        className={clsx("RichEditor-root", { "RichEditor-root--readOnly": isReadOnly }, className)}
        onClick={focusEditor}
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
    </div>
  );
}

export default TextEditor;