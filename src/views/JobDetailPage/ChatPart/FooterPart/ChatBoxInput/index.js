import clsx from 'clsx';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import './styles.scss';

const regFontTag = /<\/?font[^>]*>/gi;

const ChatBoxInput = (props) => {
  const {
    value,
    onChange,
    placeholder,
    ...rest
  } = props;

  const handleChange = evt => {
    const { value } = evt.target;
    // console.log('ChatBoxInput', value)
    const newValue = value.replace(regFontTag, '')
    onChange(newValue === '<br>' ? '' : newValue)
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
        className={clsx("ChatBoxInput", { 'ChatBoxInput__empty': !value })}
        onChange={handleChange}
        onPaste={pasteAsPlainText}
        {...rest}
      />
      <div className={clsx("ChatBoxInput--placeholder", { 'ChatBoxInput--placeholder__empty': !value })}>
        {placeholder}
      </div>
    </>
  );
}

ChatBoxInput.propTypes = {

};

export default ChatBoxInput;
