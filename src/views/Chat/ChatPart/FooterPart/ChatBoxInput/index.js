import PropTypes from "prop-types";
import clsx from 'clsx';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import './styles.scss';
import htmlToText from "helpers/jobDetail/jsHtmlToText";
import QuickLikeIcon from '../QuickLikeIcon';

const regFontTag = /<\/?font[^>]*>/gi;
let isPressShift = false;

class ChatBoxInput extends React.Component {
  state = {
    value: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onChange(this.state.value)
    }
  }

  handleChange = evt => {
    const { value } = evt.target;
    // console.log('ChatBoxInput', value)
    const newValue = value.replace(regFontTag, '')
    const changeValue = newValue === '<br>' ? '' : newValue
    this.setState({ value: changeValue })
  };

  pasteAsPlainText = event => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  onKeyDown = (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 16) {// shift
      isPressShift = true;
    } else if (keyCode === 13 && this.props.isOpenMention) {// enter
      this.props.onChooseMention()
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault()
    } else if (keyCode === 13 && !isPressShift) {// enter
      this.props.onSendMessage();
      this.setState({value: ""})
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault()
    } else if (keyCode === 50 && isPressShift) {// @
      this.props.onOpenMention(true)
    } else if (keyCode === 8) {// backspace
      this.props.onDeleteChar();
    } else if (keyCode === 38) {// up
      this.props.onPressUp()
    } else if (keyCode === 40) {// down
      this.props.onPressDown()
    } else if (keyCode === 32) {// space
      this.props.setOpenMention(false)
    }
    if ((keyCode === 38 || keyCode === 40) && this.props.isOpenMention) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault()
    }
    if (keyCode === 38) {// up
    }
  }

  onKeyUp = (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 16) {// shift
      isPressShift = false;
    }
  }

  render() {
    return (
      <>
        <ContentEditable
          innerRef={this.props.innerRef}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          html={this.state.value}
          className="ChatBoxInput"
          onChange={this.handleChange}
          onPaste={this.pasteAsPlainText}
        />
        <div className={clsx("ChatBoxInput--placeholder",
          {
            'ChatBoxInput--placeholder__empty': !this.props.value
          })}>
          {this.props.placeholder}
        </div>
        <div className="chatBox--send"
          onClick={(e) => {
            e.stopPropagation();
            this.props.onSendMessage() 
            this.setState({value: ""})
          }}
          ref={this.props.sendButtonRef}
          style={{ color: this.props.groupActiveColor }}
        >
          {this.props.isShowQuickLike ?
            <QuickLikeIcon color={this.props.groupActiveColor} />
            : this.props.labelButton
          }
        </div>
      </>
    );
  }
}

ChatBoxInput.propTypes = {
  innerRef: PropTypes.any,
  isOpenMention: PropTypes.any,
  onChange: PropTypes.func,
  onChooseMention: PropTypes.func,
  onDeleteChar: PropTypes.func,
  onOpenMention: PropTypes.func,
  onPressDown: PropTypes.func,
  onPressUp: PropTypes.func,
  onSendMessage: PropTypes.func,
  placeholder: PropTypes.any,
  setOpenMention: PropTypes.func,
  value: PropTypes.any
};

export default ChatBoxInput;
