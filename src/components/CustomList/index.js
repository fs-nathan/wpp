import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';

export const StyledList = styled(List)`
  padding: 5px 0;
`;

export const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
  &:hover {
    cursor: pointer;
    background-color: #F2F5FA;
  }
  &:focus {
    background-color: #e6f0ff;
  }
`;

export const Primary = styled.span`
  color: #000;
  font-size: 17px;
`;

export const Secondary = styled.small`
  color: #05b50c;
  font-size: 14px;
`;
