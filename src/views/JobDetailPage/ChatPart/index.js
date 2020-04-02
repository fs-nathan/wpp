import React from 'react'
import BodyPart from './BodyPart'
import FooterPart from './FooterPart'
import HeaderPart from './HeaderPart'

function ChatPart(props) {
  const [selectedChat, setSelectedChat] = React.useState()
  return (
    <div className="container-chatpart">
      <div className="wrap-header">
        <HeaderPart {...props} />
      </div>
      <BodyPart {...props} setSelectedChat={setSelectedChat} isReply={Boolean(selectedChat)} />
      <div className="wrap-footer">
        <FooterPart {...props} parentMessage={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  )
}

export default ChatPart;
