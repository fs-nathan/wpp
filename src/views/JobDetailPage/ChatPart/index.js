import React from 'react'
import HeaderPart from './HeaderPart'
import BodyPart from './BodyPart'
import FooterPart from './FooterPart'

// const Container = styled.div`
//   border-right: 1px solid rgba(0, 0, 0, .1);
//   height: calc(100vh - 56px);
// `;

// const WrapHeader = styled.div`
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
//   padding: 0 10px;
//   height: 85px;
// `;

// const WrapBody = styled.div`
//   background-color: #f8f8f8;
//   height: calc(100% - 230px);
//   padding: 10px;
//   overflow-x: hidden;
//   scrollbar-width: thin;
//   scrollbar-color: #f8f8f8 #f8f8f8;
//   &:hover {
//     scrollbar-color: rgba(0, 0, 0, 0.1) #f8f8f8;
//   }
// `;

// const WrapFooter = styled.div`
//   border-top: 1px solid rgba(0, 0, 0, .1);
//   height: 100px;
// `;

function ChatPart(props) {
  return (
    <div className="container-chatpart">
      <div className="wrap-header">
        <HeaderPart {...props} />
      </div>
      <div className="wrap-body">
        <BodyPart {...props} />
      </div>
      <div className="wrap-footer">
        <FooterPart {...props} />
      </div>
    </div>
  )
}

export default ChatPart;
