import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';
import ColorTypo from '../ColorTypo';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:last-child {
    margin-top: 8px;
  }
`;

export default function ErrorBox({ children = 'Có lỗi xảy ra', size = 3, ...rest }) {
  return (
    <Container>
      <Icon path={mdiCloseCircle} size={size} color={'rgba(0, 0, 0, 0.2)'} />
      <ColorTypo component='div' bold uppercase color='gray' {...rest}>
        {children}
      </ColorTypo>
    </Container>
  );
}