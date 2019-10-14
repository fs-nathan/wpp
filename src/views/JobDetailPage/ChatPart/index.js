import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: chat;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

function ChatPart() {
  return (
    <Container>
      ChatPart
    </Container>
  )
}

export default ChatPart;
