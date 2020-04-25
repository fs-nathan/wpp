import clsx from 'clsx';
import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import './styles.scss';

const ChatBoxInput = (props) => {
  const {
    value,
    onChange,
    ...rest
  } = props;
  const [isEmpty, setEmpty] = useState(true);

  const handleChange = evt => {
    setEmpty(!evt.target.value)
    onChange(evt.target.value)
  };

  const pasteAsPlainText = event => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  return (
    <ContentEditable
      html={value}
      className={clsx("ChatBoxInput", { 'ChatBoxInput__empty': isEmpty })}
      onChange={handleChange}
      onPaste={pasteAsPlainText}
      {...rest}
    />
  );
}

ChatBoxInput.propTypes = {

};

export default ChatBoxInput;
