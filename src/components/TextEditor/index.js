import React, { useEffect } from 'react';
import clsx from 'classnames';
// import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';
import BoldIcon from '@material-ui/icons/FormatBoldOutlined';
import FormatItalicRounded from '@material-ui/icons/FormatItalicRounded';
import FormatUnderlinedSharp from '@material-ui/icons/FormatUnderlinedSharp';
import './styles.scss';

function TextEditor({ value, onChange, isReadOnly = false }) {
  // const [editorState, setEditorState] = React.useState(
  //   // EditorState.createWithContent(ContentState.createFromText('asf nasfsa afsfas'))
  //   EditorState.createEmpty()
  // );

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

  return (
    <div className={clsx("editor", { "editor--readOnly": isReadOnly })}>
      {!isReadOnly && <>
        <BoldIcon className="editor--button" onClick={onClickBold}></BoldIcon>
        <FormatItalicRounded className="editor--button" onClick={onClickItalic}></FormatItalicRounded>
        <FormatUnderlinedSharp className="editor--button" onClick={onClickUnderline}></FormatUnderlinedSharp>
      </>}
      <div
        className={clsx("RichEditor-root", { "RichEditor-root--readOnly": isReadOnly })}
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          readOnly={isReadOnly}
          editorState={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextEditor;