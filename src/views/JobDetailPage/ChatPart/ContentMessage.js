import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const StyledTextContentMess = styled(Typography)`
  font-weight: inherit;
  font-size: 16px;
  color: #222;
`;

const ContentMessage = ({ content }) => {
  return (
    <StyledTextContentMess component="div">{content}</StyledTextContentMess>
  );
};
export default ContentMessage;
