import clsx from 'clsx';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import './styles.scss';

const ChatBoxInput = (props) => {
  const {
    value,
    onChange,
    placeholder,
    ...rest
  } = props;

  const handleChange = evt => {
    onChange(evt.target.value)
  };

  const pasteAsPlainText = event => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  return (
    <>
      <ContentEditable
        html={value}
        className={clsx("ChatBoxInput")}
        onChange={handleChange}
        onPaste={pasteAsPlainText}
        {...rest}
      />
      <div className={clsx("ChatBoxInput--placeholder", { 'ChatBoxInput__empty': !value })}>
        {placeholder}
      </div>
    </>
  );
}

ChatBoxInput.propTypes = {

};

export default ChatBoxInput;
