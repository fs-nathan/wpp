import React from 'react'
import styled from 'styled-components'
import HeaderPart from './HeaderPart'
import BodyPart from './BodyPart'
import FooterPart from './FooterPart'

const Container = styled.div`
  border-right: 1px solid rgba(0, 0, 0, .1);
  height: calc(100vh - 56px);
`;

const WrapHeader = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 5px 10px;
  height: 100px;
`;

const WrapBody = styled.div`
  background-color: rgba(0,0,0, .1);
  height: calc(100% - 200px);
  overflow-y: scroll;
`;

const WrapFooter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, .1);
  height: 100px;
`;

function ChatPart(props) {
  return (
    <Container>
      <WrapHeader>
        <HeaderPart {...props} />
      </WrapHeader>
      <WrapBody>
        <BodyPart {...props} />
      </WrapBody>
      <WrapFooter>
        <FooterPart {...props} />
      </WrapFooter>
    </Container>
  )
}

export default ChatPart;
